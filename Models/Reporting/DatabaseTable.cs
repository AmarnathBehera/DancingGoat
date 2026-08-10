using System.Collections.Generic;

namespace DancingGoat
{
    public class DatabaseTable
    {
        /// <summary>
        /// The table name.
        /// </summary>
        public string? Name { get; set; }


        /// <summary>
        /// The table columns.
        /// </summary>
        public IEnumerable<string> Columns { get; set; } = [];
    }
}
