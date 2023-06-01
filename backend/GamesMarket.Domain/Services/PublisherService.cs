using DevIO.Business.Models.Validations;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;

namespace GamesMarket.Domain.Services
{
    public class PublisherService : BaseService, IPublisherService
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IAddressRepository _addressRepository;

        public PublisherService(IPublisherRepository publisherRepository,
                                 IAddressRepository addressRepository,
                                 INotificator notificator) : base(notificator)
        {
            _publisherRepository = publisherRepository;
            _addressRepository = addressRepository;
        }

        public async Task<bool> CreatePublisher(Publisher publisher)
        {
            if (!ExecuteValidation(new PublisherValidation(), publisher)
                || !ExecuteValidation(new AddressValidation(), publisher.Address)) return false;

            if (_publisherRepository.Find(f => f.Document == publisher.Document).Result.Any())
            {
                Notify("Já existe um fornecedor com este documento informado.");
                return false;
            }

            await _publisherRepository.Create(publisher);
            return true;
        }

        public async Task<bool> UpdatePublisher(Publisher publisher)
        {
            if (!ExecuteValidation(new PublisherValidation(), publisher)) return false;

            if (_publisherRepository.Find(f => f.Document == publisher.Document 
                && f.Id != publisher.Id).Result.Any())
            {
                Notify("Já existe um fornecedor com este documento infomado.");
                return false;
            }

            await _publisherRepository.Update(publisher);
            return true;
        }

        public async Task UpdateAddress(Address address)
        {
            if (!ExecuteValidation(new AddressValidation(), address)) return;

            await _addressRepository.Update(address);
        }

        public async Task<bool> RemovePublisher(Guid id)
        {
            if (_publisherRepository.GetPublisherAddressAndGames(id).Result.Games.Any())
            {
                Notify("O fornecedor possui produtos cadastrados!");
                return false;
            }

            var endereco = await _addressRepository.GetAddressByPublisherId(id);

            if (endereco != null)
            {
                await _addressRepository.Remove(endereco.Id);
            }

            await _publisherRepository.Remove(id);
            return true;
        }

        public void Dispose()
        {
            _publisherRepository?.Dispose();
            _addressRepository?.Dispose();
        }
    }
}
