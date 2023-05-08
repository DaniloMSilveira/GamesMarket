using System.ComponentModel.DataAnnotations;
using GamesMarketApi.Enums;

namespace GamesMarketApi.Entities
{
    public class Game : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public CategoryEnum Category { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        public string? Version { get; set; }
    }
}