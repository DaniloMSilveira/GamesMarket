namespace GamesMarketApi.Entities
{
    public interface IEntity
    {
        DateTime CreatedDate { get; set; }

        DateTime ModifiedDate { get; set; }
    }
}
