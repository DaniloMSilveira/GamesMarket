using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace GamesMarket.Infra.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        public GameRepository(AppDbContext context) : base(context) 
        { 
        }

        public async Task<IEnumerable<Game>> GetAllGames()
        {
            return await Db.Games.AsNoTracking().Include(f => f.Publisher)
                .OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<Game> GetGame(Guid id)
        {
            return await Db.Games.AsNoTracking().Include(f => f.Publisher)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Game>> GetPublisherGames(Guid publisherId)
        {
            return await Find(p => p.PublisherId == publisherId);
        }
    }
}
