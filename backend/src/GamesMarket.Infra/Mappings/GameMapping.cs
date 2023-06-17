using GamesMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamesMarket.Infra.Mappings
{
    public class GameMapping : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasColumnType("varchar(120)");

            builder.Property(p => p.Description)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(p => p.Genre)
                .IsRequired()
                .HasColumnType("varchar(120)");

            builder.Property(p => p.Price)
                .IsRequired()
                .HasColumnType("decimal(10,2)");

            builder.Property(p => p.ImageUrl)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.ToTable("Games");
        }
    }
}
