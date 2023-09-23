using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Applications.Dtos
{
    public class FilterRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public Status? Status { get; set; } = null;
        public DateTime? Birtday { get; set; } = null;
        public DateTime? CreatedAt { get; set; } = null;
        public DateTime? UpdatedAt { get; set; } = null;
        public RangeDate? RangeDate { get; set; } = null;
        public int Page { get; set; }
        public int PerPage { get; set; }
    }
}
