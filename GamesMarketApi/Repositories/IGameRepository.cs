using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;

namespace GamesMarketApi.Repositories
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> GetAll();
        Task<IEnumerable<Game>> GetByPagination(PaginationDto paginationDto);
        Task<Game> GetById(int id);
        Task CreateAsync(Game game);
        Task UpdateAsync(Game game);
        Task RemoveAsync(Game game);
    }
}
