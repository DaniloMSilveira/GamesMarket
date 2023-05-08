using AutoMapper;
using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;

namespace GamesMarketApi.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserReadDto>();
        }
    }
}
