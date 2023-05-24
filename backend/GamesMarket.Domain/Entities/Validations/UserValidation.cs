using FluentValidation;

namespace GamesMarket.Domain.Entities.Validations
{
    public class UserValidation: AbstractValidator<User>
    {
        public UserValidation() 
        {
            RuleFor(c => c.AspNetUserId)
                .NotEmpty();

            RuleFor(c => c.Name)
                .NotEmpty();

            RuleFor(c => c.UserName)
                .NotEmpty();

            RuleFor(c => c.Email)
                .NotEmpty()
                .EmailAddress();
        }
    }
}
