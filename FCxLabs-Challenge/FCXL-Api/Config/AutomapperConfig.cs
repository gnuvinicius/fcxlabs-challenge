using AutoMapper;
using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Config
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<User, UserRequestDto>().ReverseMap();
            CreateMap<User, UserResponseDto>().ReverseMap();
        }
    }
}
