using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Entities;

namespace GamesMarket.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserReadDto>();
        }
    }
}
