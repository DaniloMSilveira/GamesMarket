using System.ComponentModel.DataAnnotations;

namespace GamesMarketApi.Dtos.Game
{
    public class GameCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string ReleaseDate { get; set; }
    }
}