using FCxLabs.Api.Applications.Dtos;

namespace FCxLabs.Api.Domains;

public class User
{
    public int Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Username { get; private set; } = string.Empty;
    public string Password { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Phone { get; private set; } = string.Empty;
    public string CPF { get; private set; } = string.Empty;
    public DateTime Birtday { get; private set; }
    public string MotherName { get; private set; } = string.Empty;
    public Status Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; set; }

    public User() { }

    public User(UserRequestDto dto, string password)
    {
        Username = dto.Username;
        Name = dto.Name;
        Password = password;
        Email = dto.Email;
        Phone = dto.Phone;
        CPF = dto.CPF;
        Status = Status.Active;
        Birtday = dto.Birtday.ToUniversalTime();
        MotherName = dto.MotherName;
        CreatedAt = DateTime.Now;
        UpdatedAt = DateTime.Now;
    }

    public void BlockUser()
    {
        Status = Status.Blocked;
    }

    internal void InactiveUser()
    {
        Status = Status.Inactive;
    }

    internal void UpdateFields(UserUpdateRequestDto dto)
    {
        Username = dto.Username;
        Name = dto.Name;
        Email = dto.Email;
        Phone = dto.Phone;
        CPF = dto.CPF;
        Birtday = dto.Birtday.ToUniversalTime();
        MotherName = dto.MotherName;
        UpdatedAt = DateTime.Now;
    }
}
