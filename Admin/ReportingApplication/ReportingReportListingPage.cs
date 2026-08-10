using CMS.DataEngine;
using CMS.Membership;
using DancingGoat;
using DancingGoat.Admin.ReportingApplication;
using DancingGoat.Admin.ReportingApplication.UIPage;
using Kentico.Xperience.Admin.Base;

using Microsoft.Extensions.Localization;
using System.Threading.Tasks;


[assembly: UIPage(
    parentType: typeof(ReportingApplicationChannelSettingsEditSection),
    slug: "reporting-report",
    uiPageType: typeof(ReportingReportListingPage),
    name: "Reporting Report Settings",
    templateName: TemplateNames.SECTION_LAYOUT,
    order: 10)]

[assembly: UIPage(
    parentType: typeof(ReportingReportListingPage),
    slug: "queries",
    uiPageType: typeof(EditQuery),
    name: "Queries",
    templateName: "@dancing-goat/reporting/EditQuery",
    order: UIPageOrder.First)]

//// Register full-screen editor page so IPageLinkGenerator can resolve EditQueryPage
//[assembly: UIPage(
//    parentType: typeof(ReportingApplication),
//    slug: "edit-query-page",
//    uiPageType: typeof(EditQueryPage),
//    name: "Edit Query (Full screen)",
//    // Use the same client template as the existing EditQuery page so the SQL editor UI renders
//    templateName: "@dancing-goat/reporting/EditQuery",
//    order: UIPageOrder.NoOrder)]

[assembly: UIPage(
    parentType: typeof(ReportingReportListingPage),
    slug: "exports",
    uiPageType: typeof(ExportListing),
    name: "Exported data",
    templateName: TemplateNames.LISTING,
    order: UIPageOrder.NoOrder)]
[assembly: UIPage(
    parentType: typeof(ReportingReportListingPage),
    slug: "query-browser",
    uiPageType: typeof(ReportingQueryBrowserPage),
    name: "Query Browser",
    templateName: TemplateNames.SECTION_LAYOUT,
    order: 10)]
[UIPermission(EXPORT_PERMISSION)]
[UIPermission(SystemPermissions.VIEW)]
[UIPermission(SystemPermissions.UPDATE, "Execute")]
public class ReportingReportListingPage : ListingPage
{
    public const string EXPORT_PERMISSION = "Export";
    public const string IDENTIFIER = "DancingGoat.Reporting";
    private readonly IStringLocalizer<SharedResources> stringLocalizer;
    protected override string ObjectType => ReportingReportInfo.OBJECT_TYPE;
    [PageParameter(typeof(IntPageModelBinder))]
    public int ReportingReportId { get; set; }

    public ReportingReportListingPage(IStringLocalizer<SharedResources> stringLocalizer) : base()
    {
        this.stringLocalizer = stringLocalizer;
    }
    public override Task ConfigurePage()
    {
        PageConfiguration.ColumnConfigurations
            .AddColumn(nameof(ReportingReportInfo.ReportingReportQuery), stringLocalizer["ReportQuery"]);


        //PageConfiguration.HeaderActions.AddLink<ReportingReportCreatePage>(
        //    stringLocalizer["Add Report"],
        //    parameters: new PageParameterValues
        //        {
        //        { typeof(ReportingApplicationChannelSettingsEditSection), ReportingReportId }
        //        });



        PageConfiguration.TableActions
            .AddDeleteAction(nameof(Delete));

        PageConfiguration.QueryModifiers
            .AddModifier((query, _) =>
            {
                return query.Where(new WhereCondition().WhereEquals(nameof(ReportingReportInfo.ReportingReportChannelSettingsID), ReportingReportId));
            });

        return base.ConfigurePage();
    }


}
