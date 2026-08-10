using CMS;
using Kentico.Xperience.Admin.Base;

[assembly: AssemblyDiscoverable]
[assembly: RegisterModule(typeof(DancingGoat.Admin.ReportingApplication.Client.ReportingAdminModule))]

namespace DancingGoat.Admin.ReportingApplication.Client
{
    internal class ReportingAdminModule : AdminModule
    {
        public ReportingAdminModule()
            : base(nameof(ReportingAdminModule))
        {
        }

        protected override void OnInit()
        {
            base.OnInit();

            RegisterClientModule("dancing-goat", "reporting");
        }
    }
}
