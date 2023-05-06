using GamesMarketApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesMarketApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {
            
        }

        public DbSet<Game> Games { get; set; }
    }
}
