using Kentico.Xperience.Admin.Base;
[assembly: UIPage(
    parentType: typeof(DancingGoat.Admin.ReportingApplication.ReportingApplicationChannelSettingsListingPage),
    slug: PageParameterConstants.PARAMETERIZED_SLUG,
    uiPageType: typeof(DancingGoat.Admin.ReportingApplication.ReportingApplicationChannelSettingsEditSection),
    name: "Edit Reporting Application",
    templateName: TemplateNames.SECTION_LAYOUT,
    order: 0)]

namespace DancingGoat.Admin.ReportingApplication
{
    public class ReportingApplicationChannelSettingsEditSection : EditSectionPage<ReportingChannelSettingInfo>
    {
    }
}
