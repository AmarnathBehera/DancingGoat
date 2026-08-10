using CMS.ContentEngine;
using CMS.DataEngine;
using CMS.ContentEngine;
using Kentico.Xperience.Admin.Base.FormAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DancingGoat
{
    internal sealed class ChannelOptionsProvider : IDropDownOptionsProvider
    {
        private readonly IInfoProvider<ChannelInfo> channelInfoProvider;

        public ChannelOptionsProvider(IInfoProvider<ChannelInfo> channelInfoProvider)
        {
            this.channelInfoProvider = channelInfoProvider;
        }

        public Task<IEnumerable<DropDownOptionItem>> GetOptionItems()
        {
            var channels = channelInfoProvider.Get()
                .Select(c => new DropDownOptionItem
                {
                    Value = c.ChannelID.ToString(),
                    Text = c.ChannelDisplayName
                })
                .OrderBy(i => i.Text)
                .AsEnumerable();

            return Task.FromResult(channels);
        }
    }
}
