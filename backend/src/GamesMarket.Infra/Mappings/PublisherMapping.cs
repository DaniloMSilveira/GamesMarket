using GamesMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamesMarket.Infra.Mappings
{
    public class PublisherMapping : IEntityTypeConfiguration<Publisher>
    {
        public void Configure(EntityTypeBuilder<Publisher> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Email)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.TypePerson)
                .IsRequired()
                .HasColumnType("char(2)");

            builder.Property(p => p.Document)
                .IsRequired()
                .HasColumnType("varchar(14)");

            // 1 : 1 => Publisher : Address
            builder.HasOne(f => f.Address)
                .WithOne(e => e.Publisher);

            // 1 : N => Publisher : Games
            builder.HasMany(f => f.Games)
                .WithOne(p => p.Publisher)
                .HasForeignKey(p => p.PublisherId);

            builder.ToTable("Publishers");
        }
    }
}
