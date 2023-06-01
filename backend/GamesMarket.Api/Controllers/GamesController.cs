using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GamesMarket.Api.Controllers
{
    [Authorize]
    [Route("v1/games")]
    public class GamesController : MainController
    {
        private readonly IGameRepository _repository;
        private readonly IGameService _service;
        private readonly IMapper _mapper;

        public GamesController(INotificator notificator, 
                                  IGameRepository repository,
                                  IGameService service, 
                                  IMapper mapper,
                                  IUser user) : base(notificator, user)
        {
            _repository = repository;
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<GameDto>> GetGames()
        {
            return _mapper.Map<IEnumerable<GameDto>>(await _repository.GetAllGames());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<GameDto>> GetGameById(Guid id)
        {
            var game = await GetGame(id);

            if (game == null) return NotFound();

            return game;
        }

        //[ClaimsAuthorize("Game", "Create")]
        [HttpPost]
        public async Task<ActionResult<GameDto>> CreateGame(GameCreateDto dto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var imageName = Guid.NewGuid() + "_" + dto.Image;
            //if (!UploadFile(dto.ImageUpload, imageName))
            //{
            //    return CustomResponse(dto);
            //}

            dto.Image = imageName;
            await _service.CreateGame(_mapper.Map<Game>(dto));

            return CustomResponse(dto);
        }

        //[ClaimsAuthorize("Game", "Update")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateGame(Guid id, GameUpdateDto dto)
        {
            if (id != dto.Id)
            {
                NotifyError("Os ids informados não são iguais!");
                return CustomResponse();
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var updateGameDto = await GetGame(id);
            if (updateGameDto == null) return NotFound();

            //if (dto.ImageUpload != null)
            //{
            //    var imageName = Guid.NewGuid() + "_" + dto.Image;
            //    if (!UploadFile(dto.ImageUpload, imageName))
            //    {
            //        return CustomResponse(ModelState);
            //    }

            //    updateGameDto.Image = imageName;
            //}
            //else
            //{
            //    dto.Image = updateGameDto.Image;
            //}

            updateGameDto.PublisherId = dto.PublisherId;
            updateGameDto.Name = dto.Name;
            updateGameDto.Description = dto.Description;
            updateGameDto.Price = dto.Price;

            await _service.UpdateGame(_mapper.Map<Game>(updateGameDto));

            return CustomResponse(dto);
        }

        //[ClaimsAuthorize("Game", "Delete")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<GameDto>> RemoveGame(Guid id)
        {
            var game = await GetGame(id);

            if (game == null) return NotFound();

            await _service.RemoveGame(id);

            return CustomResponse(game);
        }

        private bool UploadFile(string arquivo, string imgNome)
        {
            if (string.IsNullOrEmpty(arquivo))
            {
                NotifyError("Forneça uma imagem para este produto!");
                return false;
            }

            var imageDataByteArray = Convert.FromBase64String(arquivo);

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imgNome);

            if (System.IO.File.Exists(filePath))
            {
                NotifyError("Já existe um arquivo com este nome!");
                return false;
            }

            System.IO.File.WriteAllBytes(filePath, imageDataByteArray);

            return true;
        }

        private async Task<GameDto> GetGame(Guid id)
        {
            return _mapper.Map<GameDto>(await _repository.GetGame(id));
        }
    }
}