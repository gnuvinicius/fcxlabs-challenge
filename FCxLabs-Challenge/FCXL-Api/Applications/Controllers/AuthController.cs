using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Applications.Services;
using FCxLabs.Api.Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace FCxLabs.Api.Applications.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> Authenticate(AuthRequestDto auth)
    {
        try
        {
            var token = await _service.Authenticate(auth);
            return Ok(token);
        }
        catch (Exception ex)
        {
            return BadRequest(new { code = 400, ex.Message });
        }
    }

    [HttpPost("signup")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> CreateUser(UserRequestDto user)
    {
        try
        {
            await _service.CreateUser(user);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(new { code = 400, ex.Message });
        }
    }
}