using CMS.Base;
using CMS.Core;
using CMS.Helpers;
using CMS.Membership;
using DancingGoat.Admin.ReportingApplication;
using DancingGoat.Enum;
using Kentico.Xperience.Admin.Base;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DancingGoat
{

    /// <summary>
    /// Listing UI page which displays the results of a SQL query.
    /// </summary>
    [UINavigation(true)]
    [UIEvaluatePermission(SystemPermissions.VIEW)]

    public class ResultListing(
    ISqlBrowserResultProvider sqlBrowserQueryProvider,
    ISqlBrowserExporter sqlBrowserExporter,
    IEventLogService eventLogService,
    IUIPermissionEvaluator permissionEvaluator,
    IPageLinkGenerator pageLinkGenerator) : DataContainerListingPage
    {
        [PageParameter(typeof(IntPageModelBinder))]
        public int ReportingChannelSettingId { get; set; }
        public override async Task ConfigurePage()
        {
            // If no query is set, expose a header action to let the user enter one and show the "No results" callout.
            var currentQuery = sqlBrowserQueryProvider.GetQuery();
            if (string.IsNullOrEmpty(currentQuery))
            {
                // Open the full editor so the user can enter SQL in a dedicated window.
                // Use OpenEditQuery which navigates to the EditQuery page (provides editor, execute, save/delete).
                PageConfiguration.HeaderActions.AddCommand(
                    "Enter query",
                    nameof(OpenEditQuery),
                    "Open SQL editor to compose and run a query for the current channel");

                // Provide a quick navigation back to the channel list instead of opening the channel selector
                PageConfiguration.HeaderActions.AddCommandWithConfirmation(
                    "Back to channel",
                    nameof(BackToChannel),
                    "Return to channel list",
                    "Back");


                PageConfiguration.Callouts = [
                    new CalloutConfiguration
                {
                    Headline = "No results",
                    Content = "Query result has no data, please check the Event log for errors or modify your query",
                    Placement = CalloutPlacement.OnPaper,
                    Type = CalloutType.FriendlyWarning
                }];

                await base.ConfigurePage();
                return;
            }

            int recordCount = sqlBrowserQueryProvider.GetTotalRecordCount();

            // Provide a quick navigation back to the channel list instead of opening the channel selector
            PageConfiguration.HeaderActions.AddCommandWithConfirmation(
                "Back to channel",
                nameof(BackToChannel),
                "Return to channel list",
                "Back");

            await base.ConfigurePage();
        }


        [PageCommand(Permission = ReportingReportListingPage.EXPORT_PERMISSION)]
        public async Task<ICommandResponse> Export(ExportConfirmationDialogModel model)
        {
            string? exportedPath = null;
            var exportType = model.ExportType?.ToLower() switch
            {
                "csv" => SqlBrowserExportType.Csv,
                "excel" => SqlBrowserExportType.Excel,
                "json" => SqlBrowserExportType.Json,
                _ => SqlBrowserExportType.None
            };
            if (exportType == SqlBrowserExportType.None)
            {
                return Response().AddSuccessMessage($"Invalid export type.");
            }

            try
            {
                exportedPath = await sqlBrowserExporter.Export(exportType, model.FileName);
            }
            catch (Exception ex)
            {
                eventLogService.LogException(nameof(ResultListing), nameof(Export), ex);
            }

            if (!string.IsNullOrEmpty(exportedPath))
            {
                return Response().AddSuccessMessage($"Exported results to {exportedPath}");
            }
            else
            {
                return Response().AddErrorMessage("Export failed, please check the Event log for errors");
            }
        }


        [PageCommand]
        public Task<ICommandResponse> BackToChannel()
        {
            var url = "/reporting-application/reporting-application-channel-settings";
            return Task.FromResult((ICommandResponse)NavigateTo(url));
        }

        [PageCommand]
        public Task<ICommandResponse> SubmitQuery(EditQueryModel model)
        {
            if (string.IsNullOrWhiteSpace(model?.QueryText))
            {
                return Task.FromResult(Response().AddErrorMessage("No query entered"));
            }

            // Set the query and refresh the listing so it will be executed.
            sqlBrowserQueryProvider.SetQuery(model.QueryText!);

            var url = pageLinkGenerator.GetPath<ResultListing>();
            var channelId = CMS.Helpers.QueryHelper.GetString("channelId", null);
            if (!string.IsNullOrEmpty(channelId))
            {
                url += (url.Contains("?") ? "&" : "?") + $"channelId={channelId}";
            }

            return Task.FromResult((ICommandResponse)NavigateTo(url));
        }

        [PageCommand]
        public Task<ICommandResponse> OpenEditQuery()
        {
            int? _channelId = ReportingChannelSettingId;
            var channelIdString = _channelId.ToString();
            string initialQuery = string.IsNullOrEmpty(channelIdString)
                ? "WHERE ChannelID = {channelId}\n"
                : $"WHERE ChannelID = {channelIdString}\n";

            sqlBrowserQueryProvider.SetQuery(initialQuery);

            PageParameterValues? parameters = null;
            if (!string.IsNullOrEmpty(channelIdString) && int.TryParse(channelIdString, out var channelId))
            {
                parameters = new PageParameterValues
                {
                    { typeof(ReportingApplicationChannelSettingsEditSection), channelId }
                };
            }

            string url;
            if (parameters == null)
            {
                url = pageLinkGenerator.GetPath<EditQuery>();
            }
            else
            {
                url = pageLinkGenerator.GetPath<EditQuery>(parameters);
            }

            return Task.FromResult((ICommandResponse)NavigateTo(url));
        }


        protected override object GetIdentifier(IDataContainer dataContainer) =>
            ValidationHelper.GetInteger(dataContainer[SqlBrowserResultProvider.ROW_IDENTIFIER_COLUMN], -1);


        protected override Task<IEnumerable<IDataContainer>> LoadDataContainers(CancellationToken cancellationToken) =>
            sqlBrowserQueryProvider.GetRowsAsDataContainer();
    }

}
