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

    public class UserEditDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public DateOnly? BirthDay { get; set; }
        public string? AvatarUrl { get; set; }
    }

    public class UserReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateOnly? BirthDay { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
