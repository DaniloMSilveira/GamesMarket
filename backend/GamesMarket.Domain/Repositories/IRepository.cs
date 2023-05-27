using GamesMarket.Domain.Entities;
using System.Linq.Expressions;

namespace GamesMarket.Domain.Repositories
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> query);
        Task<TEntity> GetById(Guid id);
        Task<List<TEntity>> GetAll();
        Task Create(TEntity entity);
        Task Update(TEntity entity);
        Task Remove(Guid id);
        Task<int> SaveChanges();
    }
}
