using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace GamesMarket.Api.Dtos
{
    public class GameCreateDto
    {

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public Guid PublisherId { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(120, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Genre { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(1000, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Description { get; set; }

        public string ImageUpload { get; set; }

        public string Image { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public decimal Price { get; set; }
    }

    public class GameUpdateDto
    {
        [Key]
        [Required]
        public Guid Id { get; set;}

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public Guid PublisherId { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(120, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Genre { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(1000, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Description { get; set; }

        public string? ImageUpload { get; set; }

        public string? Image { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public decimal Price { get; set; }
    }

    public class GameDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]

        public Guid PublisherId { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(120, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Genre { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(1000, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Description { get; set; }

        public string ImageUpload { get; set; }

        public string Image { get; set; }

        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public decimal Price { get; set; }

        [ScaffoldColumn(false)]
        public DateTime DataCadastro { get; set; }

        public bool Ativo { get; set; }

        [ScaffoldColumn(false)]
        public string PublisherName { get; set; }
    }
}