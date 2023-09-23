using FCxLabs.Api.Applications.Dtos;

namespace FCxLabs.Api.Applications.Services;

public interface IAuthService
{
    Task CreateUser(UserRequestDto user);
    Task<AuthResponseDto> Authenticate(AuthRequestDto auth);
}
