namespace GamesMarket.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateOnly? BirthDate { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
