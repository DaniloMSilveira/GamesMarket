namespace GamesMarket.Domain.Entities
{
    public class Publisher : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Document { get; set; }
        public string TypePerson { get; set; }
        public DateOnly FoundationDate { get; set; }

        public Address Address { get; set; }
        public IEnumerable<Game> Games { get; set; }
    }
}
