using Kentico.Xperience.Admin.Base;
using Kentico.Xperience.Admin.Base.FormAnnotations;

namespace DancingGoat
{
    [CommandConfirmationModel]
    public class ChannelSelectionDialogModel
    {
        [DropDownComponent(DataProviderType = typeof(ChannelOptionsProvider), Label = "Channel")]
        [RequiredValidationRule]
        public string? ChannelId { get; set; }
    }
}
