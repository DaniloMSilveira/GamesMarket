using GamesMarket.Domain.Notifications;

namespace GamesMarket.Domain.Interfaces
{
    public interface INotificator
    {
        bool HasNotification();
        List<Notification> GetNotifications();
        void Handle(Notification notification);
    }
}
