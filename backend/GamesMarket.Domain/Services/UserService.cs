using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;

namespace GamesMarket.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<User> GetUserById(Guid id)
        {
            return await _repository.GetById(id);
        }

        public async Task CreateUser(User user)
        {
            await _repository.Create(user);
        }

        public async Task UpdateUser(User user)
        {
            await _repository.Update(user);
        }

        public async Task RemoveUser(Guid id)
        {
            await _repository.Remove(id);
        }

    }
}
