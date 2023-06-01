using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Repositories
{
    public interface IAddressRepository : IRepository<Address>
    {
        Task<Address> GetAddressByPublisherId(Guid publisherId);
    }
}
