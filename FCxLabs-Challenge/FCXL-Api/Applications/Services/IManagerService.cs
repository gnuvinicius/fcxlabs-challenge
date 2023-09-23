using FCxLabs.Api.Applications.Dtos;

namespace FCxLabs.Api.Applications.Services
{
    public interface IManagerService
    {
        Task BlockUserById(int id);
        Task DeleteUserById(int id);
        Task<Pagination> GetAllUsers(FilterRequestDto filter);
        Task UpdateUserById(int id, UserUpdateRequestDto user);
    }
}
