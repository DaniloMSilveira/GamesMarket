using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;

namespace GamesMarket.Infra.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {

        public UserRepository(AppDbContext context) : base(context) { }

    }
}
