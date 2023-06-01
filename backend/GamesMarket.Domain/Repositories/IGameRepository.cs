using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Repositories
{
    public interface IGameRepository : IRepository<Game>
    {
        Task<IEnumerable<Game>> GetAllGames();
        Task<Game> GetGame(Guid id);
        Task<IEnumerable<Game>> GetPublisherGames(Guid publisherId);
    }
}
