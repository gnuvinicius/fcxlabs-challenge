using FCxLabs.Api.Applications.Dtos;

namespace FCxLabs.Api.Domains
{
    public interface IUserRepository
    {
        Task BlockUserById(int id);
        Task<User> CreateUser(User persist);
        Task DeleteUserById(int id);
        Task<User?> FindById(int id);
        Task<User?> FindByUsername(string username);
        Task<List<User>> GetAllUsers(FilterRequestDto filter);
        Task UpdateUser(User user);
    }
}
