using AutoMapper;
using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Applications.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public ManagerService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task BlockUserById(int id)
        {
            await _repository.BlockUserById(id);
        }

        public async Task DeleteUserById(int id)
        {
            await _repository.DeleteUserById(id);
        }

        public async Task<Pagination> GetAllUsers(FilterRequestDto filter)
        {
            List<User> users = await _repository.GetAllUsers(filter);
            var result = _mapper.Map<List<UserResponseDto>>(users);

            return new Pagination(filter.Page, filter.PerPage, result);
        }

        public async Task UpdateUserById(int id, UserUpdateRequestDto userDto)
        {
            User user = await _repository.FindById(id) ?? throw new Exception("user not found");
            
            user.UpdateFields(userDto);
            
            await _repository.UpdateUser(user);
        }
    }
}
