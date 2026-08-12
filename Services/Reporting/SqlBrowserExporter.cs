using DancingGoat.Enum;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DancingGoat
{
    public class SqlBrowserExporter : ISqlBrowserExporter
    {
        private readonly IWebHostEnvironment env;
        private readonly ISqlBrowserResultProvider resultProvider;

        public SqlBrowserExporter(
            IWebHostEnvironment env,
            ISqlBrowserResultProvider resultProvider)
        {
            this.env = env;
            this.resultProvider = resultProvider;
        }

        public async Task<string> Export(SqlBrowserExportType exportType, string? fileName = null)
        {
            string exportDirectory = GetExportDirectory();
            Directory.CreateDirectory(exportDirectory);

            string name = string.IsNullOrWhiteSpace(fileName)
                ? DateTime.UtcNow.ToString("yyyyMMdd_HHmmss")
                : Path.GetFileNameWithoutExtension(fileName);

            string ext = exportType switch
            {
                SqlBrowserExportType.Csv => ".csv",
                SqlBrowserExportType.Excel => ".xlsx",
                SqlBrowserExportType.Json => ".json",
                _ => ".dat"
            };

            string fullPath = Path.Combine(exportDirectory, name + ext);

            var columns = resultProvider.GetColumnNames().ToArray();
            var rows = await resultProvider.GetRowsAsDynamic();

            if (!columns.Any())
            {
                return string.Empty;
            }

            // JSON Export
            if (exportType == SqlBrowserExportType.Json)
            {
                var list = rows
                    .Select(ToDictionary)
                    .ToList();

                var json = JsonSerializer.Serialize(
                    list,
                    new JsonSerializerOptions
                    {
                        WriteIndented = true
                    });

                await File.WriteAllTextAsync(
                    fullPath,
                    json,
                    Encoding.UTF8);

                return fullPath;
            }

            // CSV / Excel Export
            var sb = new StringBuilder();

            static string EscapeCsv(object? value)
            {
                if (value == null)
                {
                    return string.Empty;
                }

                string text = value.ToString() ?? string.Empty;

                if (text.Contains('"'))
                {
                    text = text.Replace("\"", "\"\"");
                }

                if (text.Contains(',') ||
                    text.Contains('\n') ||
                    text.Contains('\r') ||
                    text.Contains('"'))
                {
                    text = $"\"{text}\"";
                }

                return text;
            }

            // Header row
            sb.AppendLine(string.Join(",", columns.Select(EscapeCsv)));

            // Data rows
            foreach (var row in rows)
            {
                var dictionary = ToDictionary(row);

                var values = columns.Select(column =>
                {
                    dictionary.TryGetValue(column, out object? value);
                    return EscapeCsv(value);
                });

                sb.AppendLine(string.Join(",", values));
            }

            await File.WriteAllTextAsync(
                fullPath,
                sb.ToString(),
                Encoding.UTF8);

            return fullPath;
        }

        private static IDictionary<string, object?> ToDictionary(object row)
        {
            if (row is IDictionary<string, object> expandoDictionary)
            {
                return expandoDictionary.ToDictionary(
                    x => x.Key,
                    x => (object?)x.Value);
            }

            return row.GetType()
                .GetProperties()
                .ToDictionary(
                    property => property.Name,
                    property => property.GetValue(row));
        }

        public string GetExportDirectory()
        {
            return Path.Combine(
                env.ContentRootPath,
                "App_Data",
                "Export");
        }
    }
}