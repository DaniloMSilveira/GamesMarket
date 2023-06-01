using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace GamesMarket.Infra.Repositories
{
    public class AddressRepository : Repository<Address>, IAddressRepository
    {
        public AddressRepository(AppDbContext context) : base(context) 
        {
        }

        public async Task<Address> GetAddressByPublisherId(Guid publisherId)
        {
            return await Db.Addresses.AsNoTracking()
               .FirstOrDefaultAsync(f => f.PublisherId == publisherId);
        }
    }
}
