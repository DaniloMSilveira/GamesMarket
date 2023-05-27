using System.ComponentModel.DataAnnotations;

namespace GamesMarket.Api.Dtos
{
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

    public class AdminChangeRolesDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public IEnumerable<string> Roles { get; set; }
    }

    public class AdminListUsersDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
