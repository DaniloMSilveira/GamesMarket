namespace GamesMarket.Domain.Entities
{
    public class Game : Entity
    {
        public Guid PublisherId { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }

        public Publisher Publisher { get; set; }
    }
}
