using CMS.ContentEngine;

namespace DancingGoat
{
    public partial class ReportingReportInfo
    {
        static ReportingReportInfo()
        {
            TYPEINFO.ContinuousIntegrationSettings.Enabled = true;
            TYPEINFO.ParentObjectType = ChannelInfo.OBJECT_TYPE;
            TYPEINFO.ParentIDColumn = nameof(ReportingReportID);
        }
    }
}
