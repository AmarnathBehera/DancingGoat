namespace DancingGoat
{
    public class ValidationResult
    {
        internal static readonly ValidationResult Success;

        public ValidationResult(string v)
        {
        }

        /// <summary>
        /// <c>True</c> if the validation succeeded.
        /// </summary>
        public bool IsValid { get; set; }


        /// <summary>
        /// Contains a validation message if the validation failed.
        /// </summary>
        public string? ErrorMessage { get; set; }
    }

}
