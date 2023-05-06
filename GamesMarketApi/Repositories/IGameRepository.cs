using GamesMarketApi.Models;

namespace GamesMarketApi.Repositories
{
    public interface IGameRepository
    {
        void SaveChanges();
        IEnumerable<Game> GetAll();
        Game GetById(int id);
        void Create(Game game);
    }
}
