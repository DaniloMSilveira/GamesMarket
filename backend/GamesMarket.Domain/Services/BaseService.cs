using FluentValidation;
using FluentValidation.Results;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Notifications;

namespace GamesMarket.Domain.Services
{
    public abstract class BaseService
    {
        private readonly INotificator _notificator;

        protected BaseService(INotificator notificator)
        {
            _notificator = notificator;
        }

        protected void Notify(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notify(error.ErrorMessage);
            }
        }

        protected void Notify(string message)
        {
            _notificator.Handle(new Notification(message));
        }

        protected bool ExecuteValidation<TV, TE>(TV validator, TE entity) where TV : AbstractValidator<TE> where TE : Entity
        {
            var result = validator.Validate(entity);

            if (result.IsValid) return true;

            Notify(result);

            return false;
        }
    }
}
