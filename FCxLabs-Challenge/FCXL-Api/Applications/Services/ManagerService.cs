using AutoMapper;
using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Applications.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public ManagerService(IUserRepository repository, IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _repository = repository;
            _mapper = mapper;
        }

        public async Task BlockUserById(int id)
        {
            await _repository.BlockUserById(id);
        }

        public async Task CreateUser(UserRequestDto userRequest)
        {
            await _authService.CreateUser(userRequest);
        }

        public async Task DeleteUserById(int id)
        {
            await _repository.DeleteUserById(id);
        }

        public async Task<Pagination> GetAllUsers(FilterRequestDto filter)
        {
            List<User> users = await _repository.GetAllUsersByFIlter(filter);
            int size = _repository.GetSizeAllUsersByFilter(filter);
            var result = _mapper.Map<List<UserResponseDto>>(users);

            return new Pagination(filter.First, filter.PerPage, size, result);
        }

        public async Task UpdateUserById(int id, UserUpdateRequestDto userDto)
        {
            User user = await _repository.FindById(id) ?? throw new Exception("user not found");
            
            user.UpdateFields(userDto);
            
            await _repository.UpdateUser(user);
        }
    }
}
