namespace GamesMarketApi.Dtos
{
    public class GameReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Category { get; set; }
        public string ReleaseDate { get; set; }
        public string Version { get; set; }
    }
}