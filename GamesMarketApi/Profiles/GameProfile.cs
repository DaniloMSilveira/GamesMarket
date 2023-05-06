using AutoMapper;
using GamesMarketApi.Dtos.Game;
using GamesMarketApi.Models;

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
