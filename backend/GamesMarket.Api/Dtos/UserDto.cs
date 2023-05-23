using System.ComponentModel.DataAnnotations;

namespace GamesMarket.Api.Dtos
{
    public class UserCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class UserReadDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class UserCredentialsDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class AuthenticationResponseDto
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
