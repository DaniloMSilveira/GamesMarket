using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Repositories
{
    public interface IPublisherRepository : IRepository<Publisher>
    {
        Task<Publisher> GetPublisherAddress(Guid id);
        Task<Publisher> GetPublisherAddressAndGames(Guid id);
    }
}
