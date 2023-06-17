using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Interfaces
{
    public interface IGameService : IDisposable
    {
        Task CreateGame(Game game);
        Task UpdateGame(Game game);
        Task RemoveGame(Guid id);
    }
}
