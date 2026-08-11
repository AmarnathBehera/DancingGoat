using CMS.Core;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using DancingGoat.Admin.ReportingApplication;
using Kentico.Xperience.Admin.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DancingGoat
{
    /// <summary>
    /// Edit UI page for submitting SQL queries.
    /// </summary>
    [UINavigation(true)]
    [UIEvaluatePermission(SystemPermissions.VIEW)]
    public class EditQuery(
        IEventLogService eventLogService,
        IProgressiveCache cache,
        ISqlBrowserResultProvider sqlBrowserResultProvider,
        IPageLinkGenerator pageLinkGenerator,
        IInfoProvider<ReportingReportInfo> savedQueryProvider)
        : Page<EditSqlTemplateClientProperties>
    {
        [PageParameter(typeof(IntPageModelBinder))]
        public int ReportingChannelSettingId { get; set; }

        public override async Task<EditSqlTemplateClientProperties> ConfigureTemplateProperties(EditSqlTemplateClientProperties properties)
        {
            properties.Tables = cache.Load(
                LoadTables,
                new CacheSettings(
                    10,
                    $"{nameof(EditQuery)}|{nameof(ConfigureTemplateProperties)}"));

            var query = sqlBrowserResultProvider.GetQuery();

            if (string.IsNullOrWhiteSpace(query))
            {
                query = $"""
SELECT *
FROM View_CMS_Tree_Joined
WHERE ChannelID = {ReportingChannelSettingId}
""";
            }

            properties.Query = query;
            properties.SavedQueries = (await GetSavedQueries())
                .Select(q => new SavedQuery(q));

            properties.ReportingChannelSettingId = ReportingChannelSettingId;
            return properties;
        }

        [PageCommand]
        public Task<ICommandResponse> Notify(string message) =>
            Task.FromResult(Response().AddSuccessMessage(message));

        [PageCommand]
        public Task<ICommandResponse<SqlBrowserQueryResult>> RunSql(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Task.FromResult(
                    ResponseFrom(new SqlBrowserQueryResult
                    {
                        ErrorMessage = "No query entered."
                    })
                        .AddErrorMessage("No query entered."));
            }

            sqlBrowserResultProvider.SetQuery(query);
            var result = sqlBrowserResultProvider.GetQueryResult();

            if (string.IsNullOrWhiteSpace(result.ErrorMessage))
            {
                result.AutoSavedQuery = AutoSaveQuery(query);
            }

            var response = ResponseFrom(result);
            if (!string.IsNullOrWhiteSpace(result.ErrorMessage))
            {
                return Task.FromResult(response.AddErrorMessage(result.ErrorMessage));
            }

            return Task.FromResult(response.AddSuccessMessage("Query executed."));
        }

        [PageCommand]
        public Task<ICommandResponse<SavedQuery?>> RenameQuery(SavedQuery query)
        {
            if (query.ID <= 0 || string.IsNullOrWhiteSpace(query.Name))
            {
                return Task.FromResult(
                    ResponseFrom<SavedQuery?>(null)
                        .AddErrorMessage("Received empty parameter"));
            }

            var savedQuery = savedQueryProvider.Get()
                .TopN(1)
                .WhereEquals(nameof(ReportingReportInfo.ReportingReportID), query.ID)
                .WhereEquals(nameof(ReportingReportInfo.ReportingReportChannelSettingsID), ReportingChannelSettingId)
                .FirstOrDefault();

            if (savedQuery is null)
            {
                return Task.FromResult(
                    ResponseFrom<SavedQuery?>(null)
                        .AddErrorMessage($"Query {query.ID} not found"));
            }

            savedQuery.ReportingReportDisplayName = query.Name;
            savedQuery.ReportingReportCodeName = GenerateQueryCodeName(query.Name);
            savedQuery.Update();

            query.Text = savedQuery.ReportingReportQuery;

            return Task.FromResult(
                ResponseFrom<SavedQuery?>(query)
                    .AddSuccessMessage("Query renamed!"));
        }

        [PageCommand]
        public Task<ICommandResponse<int>> DeleteQuery(int id)
        {
            var query = savedQueryProvider.Get()
                .TopN(1)
                .WhereEquals(nameof(ReportingReportInfo.ReportingReportID), id)
                .WhereEquals(nameof(ReportingReportInfo.ReportingReportChannelSettingsID), ReportingChannelSettingId)
                .FirstOrDefault();

            if (query is null)
            {
                return Task.FromResult(
                    ResponseFrom(0)
                        .AddErrorMessage($"Query {id} not found"));
            }

            query.Delete();

            return Task.FromResult(
                ResponseFrom(id)
                    .AddSuccessMessage("Query deleted!"));
        }

        [PageCommand]
        public Task<ICommandResponse<SavedQuery?>> SaveQuery(SavedQuery query)
        {
            if (string.IsNullOrWhiteSpace(query.Name) ||
                string.IsNullOrWhiteSpace(query.Text))
            {
                return Task.FromResult(
                    ResponseFrom<SavedQuery?>(null)
                        .AddErrorMessage("Received empty parameter"));
            }

            int newOrder = 0;

            var existingQueries = savedQueryProvider.Get()
                .GetEnumerableTypedResult()
                .ToList();

            if (existingQueries.Any())
            {
                newOrder = existingQueries.Count;
            }

            try
            {
                var newQuery = new ReportingReportInfo
                {
                    ReportingReportDisplayName = query.Name,
                    ReportingReportCodeName = GenerateQueryCodeName(query.Name),
                    ReportingReportDescription = string.Empty,
                    ReportingReportChannelSettingsID = ReportingChannelSettingId,
                    ReportingReportQuery = query.Text,
                    ReportingReportGUID = Guid.NewGuid()
                };

                newQuery.Insert();

                query.Order = newOrder;
                query.ID = newQuery.ReportingReportID;

                return Task.FromResult(
                    ResponseFrom<SavedQuery?>(query)
                        .AddSuccessMessage("Query saved!"));
            }
            catch (Exception ex)
            {
                eventLogService.LogException(
                    nameof(EditQuery),
                    nameof(SaveQuery),
                    ex);

                return Task.FromResult(
                    ResponseFrom<SavedQuery?>(null)
                        .AddErrorMessage(ex.Message));
            }
        }

        [PageCommand]
        public async Task<ICommandResponse<bool>> UpdateSavedOrder(
            SavedQuery[] newOrder)
        {
            var originalQueries = (await GetSavedQueries()).ToList();

            foreach (var newQuery in newOrder)
            {
                var original = originalQueries.Find(
                    q => q.ReportingReportID == newQuery.ID);

                if (original is null)
                {
                    return ResponseFrom(false)
                        .AddErrorMessage(
                            $"Failed to update order: query {newQuery.ID} not found");
                }

                // original.SqlBrowserSavedQueryOrder = newQuery.Order;
                original.Update();
            }

            return ResponseFrom(true);
        }

        private SavedQuery? AutoSaveQuery(string query)
        {
            try
            {
                string displayName = $"Query {DateTime.Now:yyyyMMdd HHmmss}";
                var savedQuery = new ReportingReportInfo
                {
                    ReportingReportDisplayName = displayName,
                    ReportingReportCodeName = GenerateQueryCodeName(displayName),
                    ReportingReportDescription = string.Empty,
                    ReportingReportChannelSettingsID = ReportingChannelSettingId,
                    ReportingReportQuery = query,
                    ReportingReportGUID = Guid.NewGuid()
                };

                savedQuery.Insert();

                return new SavedQuery(savedQuery);
            }
            catch (Exception ex)
            {
                eventLogService.LogException(
                    nameof(EditQuery),
                    nameof(AutoSaveQuery),
                    ex);

                return null;
            }
        }


        private static string GenerateQueryCodeName(string displayName)
        {
            string codeName = Regex.Replace(displayName, "[^a-zA-Z0-9_.-]", "_");
            codeName = codeName.Trim('.');

            if (string.IsNullOrWhiteSpace(codeName))
            {
                codeName = "Query";
            }

            return $"{codeName}_{Guid.NewGuid():N}";
        }


        private Task<IEnumerable<ReportingReportInfo>> GetSavedQueries() =>
            savedQueryProvider.Get()
                .WhereEquals(nameof(ReportingReportInfo.ReportingReportChannelSettingsID), ReportingChannelSettingId)
                .GetEnumerableTypedResultAsync();

        private IEnumerable<DatabaseTable> LoadTables(CacheSettings cs)
        {
            try
            {
                string query = @"
SELECT
    T.name AS 'table',
    C.name AS 'column'
FROM sys.objects AS T
JOIN sys.columns AS C
    ON T.object_id = C.object_id
WHERE T.type = 'U'
ORDER BY T.name ASC";

                var result = ConnectionHelper.ExecuteQuery(
                    query,
                    null,
                    QueryTypeEnum.SQLQuery);

                if (result.Tables.Count == 0)
                {
                    cs.Cached = false;
                    return [];
                }

                return result.Tables[0]
                    .Rows
                    .OfType<DataRow>()
                    .GroupBy(r => r["table"])
                    .Select(group => new DatabaseTable
                    {
                        Name = group.Key?.ToString() ?? string.Empty,
                        Columns = group.Select(
                            row => row["column"]?.ToString() ?? string.Empty)
                    });
            }
            catch (Exception ex)
            {
                cs.Cached = false;

                eventLogService.LogException(
                    nameof(EditQuery),
                    nameof(LoadTables),
                    ex);

                return [];
            }
        }
    }
}