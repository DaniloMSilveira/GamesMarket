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
            CreateMap<UserEditDto, User>();
            CreateMap<User, UserReadDto>().ReverseMap();

            CreateMap<Publisher, PublisherReadDto>();
            CreateMap<PublisherDto, Publisher>()
                 .ForMember(x => x.FoundationDate,
                    y => y.MapFrom(
                        z => DateOnly.Parse(z.FoundationDate))
                       );
            CreateMap<PublisherUpdateDto, Publisher>()
                 .ForMember(x => x.FoundationDate,
                    y => y.MapFrom(
                        z => DateOnly.Parse(z.FoundationDate))
                       );

            CreateMap<Address, AddressDto>().ReverseMap();

            CreateMap<GameCreateDto, Game>()
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image));
            CreateMap<GameUpdateDto, Game>()
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image));
            CreateMap<Game, GameDto>()
                .ForMember(dest => dest.PublisherName, opt => opt.MapFrom(src => src.Publisher.Name));
            CreateMap<GameDto, Game>();
        }
    }
}
