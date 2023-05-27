using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace GamesMarket.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<UserEditDto, User>();
            CreateMap<User, UserReadDto>().ReverseMap();
        }
    }
}
