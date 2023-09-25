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

    [HttpPost("temp")]
    [AllowAnonymous]
    public IActionResult ConvertJsonToSQL(List<User4devModel> user4dev)
    {
        List<string> test = new(); 

    user4dev.ForEach(u =>
        {
            test.Add(@$"INSERT INTO public.tb_user(
                username, password, name, email, phone, cpf, mother_name, status, updated_at, created_at, birtday)
                VALUES('{u.email}', '$2a$12$nD3QjUD1hWyevaGGhzPWy.umXeHuaP8LJ0r34Yp5Zt0jC42ITpAoy', '{u.nome}', '{u.email}', '{u.celular}', '{u.cpf}', '{u.mae}', 1, NULL, current_timestamp, '1977-03-07 00:00:00.00');");
        });

        return Ok(test);
    }
}


public class User4devModel
{
    public string nome { get; set; }
    public string cpf { get; set; }
    public string data_nasc { get; set; }
    public string mae { get; set; }
    public string email { get; set; }
    public string celular { get; set; }
}