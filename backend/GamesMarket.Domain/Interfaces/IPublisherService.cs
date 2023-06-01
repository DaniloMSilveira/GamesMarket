using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Interfaces
{
    public interface IPublisherService : IDisposable
    {
        Task<bool> CreatePublisher(Publisher publisher);
        Task<bool> UpdatePublisher(Publisher publisher);
        Task<bool> RemovePublisher(Guid id);
        Task UpdateAddress(Address address);
    }
}
