using System.ComponentModel.DataAnnotations;

namespace GamesMarketApi.Dtos
{
    public class UserCredentialsDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
