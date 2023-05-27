using GamesMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GamesMarket.Infra.Contexts
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<User> UsersProfile { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            if (cancellationToken.IsCancellationRequested == false)
            {
                var now = DateTime.UtcNow;

                foreach (var changedEntity in ChangeTracker.Entries())
                {
                    if (changedEntity.Entity is Entity entity)
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys())) 
                relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;

            base.OnModelCreating(modelBuilder);
        }
    }
}
