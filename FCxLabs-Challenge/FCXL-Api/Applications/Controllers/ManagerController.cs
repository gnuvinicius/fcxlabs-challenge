using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Applications.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FCxLabs.Api.Appliations.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user")]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _service;
        public ManagerController(IManagerService service)
        {
            _service = service;
        }

        [HttpGet("get-all-by-filter")]
        public async Task<IActionResult> GetAll([FromQuery] FilterRequestDto filter)
        {
            var result = await _service.GetAllUsers(filter);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserRequestDto userRequest)
        {
            await _service.CreateUser(userRequest);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserById(int id, [FromBody] UserUpdateRequestDto user)
        {
            await _service.UpdateUserById(id, user);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            await _service.DeleteUserById(id);
            return Ok();
        }

        [HttpPatch("blocker-by-id")]
        public async Task<IActionResult> BlockUserById(int id)
        {
            await _service.BlockUserById(id);
            return Ok();
        }

    }
}
