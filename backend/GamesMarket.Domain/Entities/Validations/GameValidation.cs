using FluentValidation;
using GamesMarket.Domain.Entities;

namespace DevIO.Business.Models.Validations
{
    public class GameValidation : AbstractValidator<Game>
    {
        public GameValidation()
        {
            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 100)
                .WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}