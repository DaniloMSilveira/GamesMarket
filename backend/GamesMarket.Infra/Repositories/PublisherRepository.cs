using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace GamesMarket.Infra.Repositories
{
    public class PublisherRepository : Repository<Publisher>, IPublisherRepository
    {
        public PublisherRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Publisher> GetPublisherAddress(Guid id)
        {
            return await Db.Publishers.AsNoTracking()
                .Include(c => c.Address)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Publisher> GetPublisherAddressAndGames(Guid id)
        {
            return await Db.Publishers.AsNoTracking()
                .Include(c => c.Games)
                .Include(c => c.Address)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
