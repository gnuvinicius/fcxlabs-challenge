using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Domains;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FCxLabs.Api.Applications.Services;

public class AuthService : IAuthService
{
    private const string Message = "User to persist {s}";
    private const string Message1 = "Error {s}";
    
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUserRepository userRepository, ILogger<AuthService> logger, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task CreateUser(UserRequestDto user)
    {
        try
        {
            await Validate(user.Username);

            var hashed = BCrypt.Net.BCrypt.HashPassword(user.Password, Int32.Parse(_configuration["salt"]!));
            await PersistNewUser(user, hashed);
        }
        catch (Exception ex)
        {
            _logger.LogError(Message1, ex.Message);
            throw;
        }
    }

    public async Task<AuthResponseDto> Authenticate(AuthRequestDto auth)
    {
        var user = await _userRepository.FindByUsername(auth.Username) ?? throw new Exception("user not found");

        ValidStatusUserInLogin(user);

        var verify = BCrypt.Net.BCrypt.Verify(auth.Password, user.Password);

        if (verify)
        {
            return GenerateToken(user);
        }
        else
        {
            throw new Exception(message: "wrong password");
        }
    }

    #region PRIVATE METHODS

    private AuthResponseDto GenerateToken(User user)
    {
        var secret = _configuration["secret"];

        var tokenHandler = new JwtSecurityTokenHandler();

        var key = Encoding.ASCII.GetBytes(secret!);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, !string.IsNullOrEmpty(user.Username) ? user.Username : "")
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var securityToken = tokenHandler.CreateToken(tokenDescriptor);

        string token = tokenHandler.WriteToken(securityToken);

        AuthResponseDto response = new()
        {
            Type = "Bearer",
            Token = token,
        };

        return response;
    }

    private async Task Validate(string username) {
        
        var alreadyExists = await _userRepository.FindByUsername(username);

        if (alreadyExists != null)
        {
            throw new Exception("user already exists");
        }
    }

    private async Task<User> PersistNewUser(UserRequestDto dto, string hashed)
    {
        _logger.LogInformation(Message, dto.Username);

        var user = new User(dto, hashed);

        return await _userRepository.CreateUser(user);
    }

    private static void ValidStatusUserInLogin(User user)
    {
        if (user.Status == Status.Inactive)
            throw new Exception("user is inactive");
        

        if (user.Status == Status.Blocked)
            throw new Exception("user is blocked");
        
    }

    #endregion

}
