using System.ComponentModel.DataAnnotations;

namespace GamesMarket.Api.Dtos
{
    public class PublisherDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [EmailAddress]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(14, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Document { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string TypePerson { get; set; }

        [Required]
        public string FoundationDate { get; set; }

        public AddressDto Address { get; set; }

        public bool Ativo { get; set; }
    }

    public class PublisherUpdateDto
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [EmailAddress]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(14, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Document { get; set; }

        [Required]
        public string TypePerson { get; set; }

        [Required]
        public string FoundationDate { get; set; }
    }

    public class PublisherReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Document { get; set; }
        public string TypePerson { get; set; }
        public string FoundationDate { get; set; }
        public AddressDto Address { get; set; }
        public bool Ativo { get; set; }
        public IEnumerable<GameDto> Games { get; set; }
    }
}