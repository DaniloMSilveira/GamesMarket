using GamesMarketApi.Data;
using System.ComponentModel.DataAnnotations;

namespace GamesMarketApi.Entities
{
    public class BaseEntity : IEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
