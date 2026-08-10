using CMS.Membership;
using Kentico.Xperience.Admin.Base;

[assembly: UIPage(
    parentType: typeof(ReportingReportListingPage),
    slug: "query-browser",
    uiPageType: typeof(DancingGoat.Admin.ReportingApplication.UIPage.ReportingQueryBrowserPage),
    name: "Query Browser",
    templateName: TemplateNames.SECTION_LAYOUT,
    order: 10)]

// Register Results and View record under the Query Browser application window
[assembly: UIPage(
    parentType: typeof(DancingGoat.Admin.ReportingApplication.UIPage.ReportingQueryBrowserPage),
    slug: "results",
    uiPageType: typeof(DancingGoat.ResultListing),
    name: "Results",
    templateName: TemplateNames.LISTING,
    order: UIPageOrder.NoOrder)]

[assembly: UIPage(
    parentType: typeof(DancingGoat.ResultListing),
    slug: PageParameterConstants.PARAMETERIZED_SLUG,
    uiPageType: typeof(DancingGoat.ViewRecord),
    name: "View record",
    templateName: TemplateNames.EDIT,
    order: UIPageOrder.NoOrder)]

namespace DancingGoat.Admin.ReportingApplication.UIPage
{
    [UIPermission(SystemPermissions.VIEW)]
    [UIPermission(SystemPermissions.UPDATE, "Execute")]
    public class ReportingQueryBrowserPage : ApplicationPage
    {
        [PageParameter(typeof(IntPageModelBinder))]
        public int ReportingChannelSettingId { get; set; }
    }
}
