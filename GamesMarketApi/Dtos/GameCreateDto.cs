using System.ComponentModel.DataAnnotations;

namespace GamesMarketApi.Dtos
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

        public string Version { get; set; }
    }
}