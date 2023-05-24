using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;

namespace GamesMarket.Infra.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
