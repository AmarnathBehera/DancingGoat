using CMS.ContentEngine;

namespace DancingGoat
{
    public partial class ReportingChannelSettingInfo
    {
        static ReportingChannelSettingInfo()
        {
            TYPEINFO.ContinuousIntegrationSettings.Enabled = true;
            TYPEINFO.ParentObjectType = ChannelInfo.OBJECT_TYPE;
            TYPEINFO.ParentIDColumn = nameof(ReportingChannelSettingID);
        }
    }
}
