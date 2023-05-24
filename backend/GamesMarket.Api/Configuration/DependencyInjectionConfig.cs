using GamesMarket.Api.Extensions;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Notifications;
using GamesMarket.Domain.Repositories;
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

            return services;
        }
    }
}
