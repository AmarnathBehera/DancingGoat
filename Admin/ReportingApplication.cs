using CMS.Membership;
using DancingGoat.Admin.ReportingApplication;
using Kentico.Xperience.Admin.Base;
using Kentico.Xperience.Admin.Base.UIPages;
[assembly: UIApplication(
    identifier: ReportingApplication.IDENTIFIER,
    type: typeof(ReportingApplication),
    slug: "reporting-application",
    name: "Reporting Application",
    category: BaseApplicationCategories.CONFIGURATION,
    icon: Icons.Table,
    templateName: TemplateNames.SECTION_LAYOUT)]
namespace DancingGoat.Admin.ReportingApplication
{
    [UIPermission(SystemPermissions.VIEW)]
    [UIPermission(SystemPermissions.CREATE)]
    [UIPermission(SystemPermissions.DELETE)]
    [UIPermission(SystemPermissions.UPDATE)]
    public class ReportingApplication : ApplicationPage
    {

        public const string IDENTIFIER = "DancingGoat.CustomTableSettingsApplication";
    }
}
