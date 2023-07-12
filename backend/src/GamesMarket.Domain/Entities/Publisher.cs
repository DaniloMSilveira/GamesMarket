namespace GamesMarket.Domain.Entities
{
    public class Publisher : Entity
    {
        public Publisher() {}

        public Publisher(string name,
                            string email,
                            string document,
                            string typePerson,
                            DateOnly foundationDate)
        {
            Name = name;
            Email = email;
            Document = document;
            TypePerson = typePerson;
            FoundationDate = foundationDate;
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Document { get; set; }
        public string TypePerson { get; set; }
        public DateOnly FoundationDate { get; set; }

        public virtual Address Address { get; set; }
        public virtual ICollection<Game> Games { get; set; }
    }
}
