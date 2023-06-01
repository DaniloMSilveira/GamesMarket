using FluentValidation;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Enums;
using GamesMarket.Domain.Utils;

namespace DevIO.Business.Models.Validations
{
    public class PublisherValidation : AbstractValidator<Publisher>
    {
        public PublisherValidation()
        {
            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 100)
                .WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");

            When(f => f.TypePerson == TypePerson.Person, () =>
            {
                RuleFor(f => f.Document.Length).Equal(CpfValidacao.TamanhoCpf)
                    .WithMessage("O campo Documento precisa ter {ComparisonValue} caracteres e foi fornecido {PropertyValue}.");
                RuleFor(f=> CpfValidacao.Validar(f.Document)).Equal(true)
                    .WithMessage("O documento fornecido é inválido.");
            });

            When(f => f.TypePerson == TypePerson.Entity, () =>
            {
                RuleFor(f => f.Document.Length).Equal(CnpjValidacao.TamanhoCnpj)
                    .WithMessage("O campo Documento precisa ter {ComparisonValue} caracteres e foi fornecido {PropertyValue}.");
                RuleFor(f => CnpjValidacao.Validar(f.Document)).Equal(true)
                    .WithMessage("O documento fornecido é inválido.");
            });
        }
    }
}