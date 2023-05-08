using AutoMapper;
using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;

namespace GamesMarketApi.Profiles
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<GameCreateDto, Game>();
            CreateMap<Game, GameReadDto>();
        }
    }
}
