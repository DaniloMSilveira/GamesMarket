using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Repositories
{
    public interface IUserRepository
    {
        Task CreateAsync(User user);
    }
}
