using System;
using System.IO;
using System.Threading.Tasks;
using CMS.Core;
using Microsoft.AspNetCore.Hosting;
using DancingGoat.Enum;

namespace DancingGoat
{
    public class SqlBrowserExporter : ISqlBrowserExporter
    {
        private readonly IWebHostEnvironment env;

        public SqlBrowserExporter(IWebHostEnvironment env)
        {
            this.env = env;
        }

        public Task<string> Export(SqlBrowserExportType exportType, string? fileName = null)
        {
            string exportDirectory = GetExportDirectory();
            Directory.CreateDirectory(exportDirectory);

            string name = string.IsNullOrWhiteSpace(fileName) ? DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") : fileName;
            string ext = exportType switch
            {
                SqlBrowserExportType.Csv => ".csv",
                SqlBrowserExportType.Excel => ".xlsx",
                SqlBrowserExportType.Json => ".json",
                _ => ".dat"
            };

            string fullPath = Path.Combine(exportDirectory, name + ext);

            // Minimal implementation: create an empty file. Real exporter should write actual data.
            File.WriteAllText(fullPath, string.Empty);

            return Task.FromResult(fullPath);
        }

        public string GetExportDirectory()
        {
            // Put exports in App_Data/SqlExports
            return Path.Combine(env.ContentRootPath, "App_Data", "SqlExports");
        }
    }
}
