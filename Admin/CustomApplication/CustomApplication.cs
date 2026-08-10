
using DancingGoat;
using Kentico.Xperience.Admin.Base;
using Kentico.Xperience.Admin.Base.UIPages;

[assembly: UIApplication(
    identifier: CustomApplication.IDENTIFIER,
    type: typeof(CustomApplication),
    slug: "my-application",
    name: "Custom admin UI app",
    category: BaseApplicationCategories.DEVELOPMENT,
    icon: Icons.Cogwheel,
    templateName: TemplateNames.SECTION_LAYOUT)]
namespace DancingGoat
{
    public class CustomApplication : ApplicationPage
    {
        public const string IDENTIFIER = "MyCompany.CustomApplication";

    }
}
