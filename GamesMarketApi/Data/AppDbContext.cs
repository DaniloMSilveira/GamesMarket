using GamesMarketApi.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace GamesMarketApi.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {
            
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            if (cancellationToken.IsCancellationRequested == false)
            {
                var now = DateTime.UtcNow;

                foreach (var changedEntity in ChangeTracker.Entries())
                {
                    if (changedEntity.Entity is IEntity entity)
                    {
                        switch (changedEntity.State)
                        {
                            case EntityState.Added:
                                entity.CreatedDate = now;
                                entity.ModifiedDate = now;
                                break;
                            case EntityState.Modified:
                                Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                                entity.ModifiedDate = now;
                                break;
                        }
                    }
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
