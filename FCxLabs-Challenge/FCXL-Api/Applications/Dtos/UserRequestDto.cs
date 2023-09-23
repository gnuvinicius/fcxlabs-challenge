using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Applications.Dtos;

public class UserRequestDto
{
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CPF { get; set; } = string.Empty;
    public DateTime Birtday { get; set; }
    public string MotherName { get; set; } = string.Empty;
    public Status Status { get; set; }
}
