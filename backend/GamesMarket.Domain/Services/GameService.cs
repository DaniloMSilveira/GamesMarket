using DevIO.Business.Models.Validations;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;

namespace GamesMarket.Domain.Services
{
    public class GameService : BaseService, IGameService
    {
        private readonly IGameRepository _repository;

        public GameService(IGameRepository repository,
                            INotificator notificator) : base(notificator)
        {
            _repository = repository;
        }

        public async Task CreateGame(Game game)
        {
            if (!ExecuteValidation(new GameValidation(), game)) return;

            await _repository.Create(game);
        }

        public async Task UpdateGame(Game game)
        {
            if (!ExecuteValidation(new GameValidation(), game)) return;

            await _repository.Update(game);
        }

        public async Task RemoveGame(Guid id)
        {
            await _repository.Remove(id);
        }

        public void Dispose()
        {
            _repository?.Dispose();
        }
    }
}
