using GamesMarket.Api.Extensions;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Notifications;
using GamesMarket.Domain.Repositories;
using GamesMarket.Domain.Services;
using GamesMarket.Infra.Repositories;

namespace GamesMarket.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUser, AspNetUser>();
            services.AddScoped<INotificator, Notificator>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IPublisherRepository, PublisherRepository>();
            services.AddScoped<IGameRepository, GameRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPublisherService, PublisherService>();
            services.AddScoped<IGameService, GameService>();

            return services;
        }
    }
}
