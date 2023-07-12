using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Repositories
{
    public interface IPublisherRepository : IRepository<Publisher>
    {
        Task<bool> AddPublishers(IList<Publisher> publishers);
        Task<Publisher> GetPublisherAddress(Guid id);
        Task<Publisher> GetPublisherAddressAndGames(Guid id);
    }
}
