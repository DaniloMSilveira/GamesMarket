using System.ComponentModel.DataAnnotations;
using GamesMarketApi.Enums;

namespace GamesMarketApi.Models
{
    public class Game
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public CategoryEnum Category { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }
    }
}