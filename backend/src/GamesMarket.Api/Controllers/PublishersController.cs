using AutoMapper;
using ExcelDataReader;
using GamesMarket.Api.Dtos;
using GamesMarket.Api.Extensions;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GamesMarket.Api.Controllers
{
    // [Authorize]
    [Route("v1/publishers")]
    public class PublishersController : MainController
    {
        private readonly IPublisherService _service;
        private readonly IPublisherRepository _publisherRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public PublishersController(IPublisherRepository publisherRepository, 
                                      IMapper mapper,
                                      IPublisherService service,
                                      INotificator notificator,
                                      IAddressRepository addressRepository,
                                      IUser user) : base(notificator, user)
        {
            _mapper = mapper;
            _service = service;
            _publisherRepository = publisherRepository;
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<PublisherReadDto>> GetPublishers()
        {
            return _mapper.Map<IEnumerable<PublisherReadDto>>(await _publisherRepository.GetAll());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<PublisherReadDto>> GetById(Guid id)
        {
            var publisher = await _publisherRepository.GetPublisherAddressAndGames(id);

            if (publisher == null) return NotFound();

            return _mapper.Map<PublisherReadDto>(publisher);
        }

        //[ClaimsAuthorize("Fornecedor","Adicionar")]
        [HttpPost]
        public async Task<ActionResult<PublisherDto>> CreatePublisher(PublisherDto dto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _service.CreatePublisher(_mapper.Map<Publisher>(dto));

            return CustomResponse(dto);
        }

        [HttpPost("importacao-xlsx")]
        public async Task<ActionResult> ImportacaoPublishers([FromForm] IFormFile file)
        {
            if (file is null)
                return BadRequest("Não foi importado nenhum arquivo!");

            // For .net core, the next line requires the NuGet package, 
            // System.Text.Encoding.CodePages
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            using(var reader = ExcelReaderFactory.CreateReader(file.OpenReadStream()))
            {
                //skip headers
                reader.Read();

                var publishers = new List<Publisher>();

                while(reader.Read()) 
                {
                    var publisher = new Publisher(
                        name: reader.GetValue(0).ToString(),
                        email: reader.GetValue(1).ToString(),
                        document: reader.GetValue(2).ToString(),
                        typePerson: reader.GetValue(3).ToString(),
                        foundationDate: DateOnly.FromDateTime(DateTime.Parse(reader.GetValue(4).ToString()))
                    );
                    
                    publishers.Add(publisher);   
                }

                await _publisherRepository.AddPublishers(publishers);
            };

            return Ok();
        }

        //[ClaimsAuthorize("Fornecedor", "Atualizar")]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<PublisherDto>> UpdatePublisher(Guid id,
            [FromBody] PublisherUpdateDto dto)
        {
            if (id != dto.Id)
            {
                NotifyError("O id informado não é o mesmo que foi passado na query");
                return CustomResponse(dto);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _service.UpdatePublisher(_mapper.Map<Publisher>(dto));

            return CustomResponse(dto);
        }

        //[ClaimsAuthorize("Fornecedor", "Excluir")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> RemovePublisher(Guid id)
        {
            var publisher = await _publisherRepository.GetPublisherAddress(id);

            if (publisher == null) return NotFound();

            await _service.RemovePublisher(id);

            return NoContent();
        }

        [HttpGet("{id:guid}/address")]
        public async Task<AddressDto> GetPublisherAddress(Guid id)
        {
            return _mapper.Map<AddressDto>(await _addressRepository.GetAddressByPublisherId(id));
        }

        //[ClaimsAuthorize("Fornecedor", "Atualizar")]
        [HttpPut("{id:guid}/address")]
        public async Task<IActionResult> UpdatePublisherAddress(Guid id, AddressDto dto)
        {
            if (id != dto.PublisherId)
            {
                NotifyError("O id do publisher informado não é o mesmo que foi passado na query");
                return CustomResponse(dto);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _service.UpdateAddress(_mapper.Map<Address>(dto));

            return CustomResponse(dto);
        }
    }
}