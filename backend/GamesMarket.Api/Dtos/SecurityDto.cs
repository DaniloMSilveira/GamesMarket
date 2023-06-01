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
        public string AccessToken { get; set; }
        public double ExpiresIn { get; set; }
        public UserTokenDto UserToken { get; set; }
    }

    public class UserTokenDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public IEnumerable<ClaimDto> Claims { get; set; }
    }

    public class ClaimDto
    {
        public string Value { get; set; }
        public string Type { get; set; }
    }

    public class AdminChangeProfileDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Profile { get; set; }
    }

    public class AdminListUsersDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Profile { get; set; }
    }
}
