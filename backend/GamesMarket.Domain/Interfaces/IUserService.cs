using GamesMarket.Domain.Entities;

namespace GamesMarket.Domain.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserById(Guid id);
        Task CreateUser(User user);
        Task UpdateUser(User user);
        Task RemoveUser(Guid id);
    }
}
