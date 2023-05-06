using AutoMapper;
using GamesMarketApi.Dtos.Game;
using GamesMarketApi.Models;
using GamesMarketApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GamesMarketApi.Controllers;

[Route("[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IMapper _mapper;
    private readonly IGameRepository _repository;

    public GameController(
        ILogger<GameController> logger,
        IMapper mapper,
        IGameRepository repository)
    {
        _logger = logger;
        _mapper = mapper;
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<GameReadDto>> GetGames()
    {
        try
        {
            var games = _repository.GetAll();

            return Ok(_mapper.Map<IEnumerable<GameReadDto>>(games));
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }

    [HttpGet("{id}", Name = "GetGameById")]
    public ActionResult<GameReadDto> GetGameById(int id)
    {
        try 
        { 
            var game = _repository.GetById(id);
            if (game == null)
            {
                return NotFound();
            }

            var gameReadDto = _mapper.Map<GameReadDto>(game);
            return Ok(gameReadDto);
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }

    [HttpPost]
    public ActionResult<GameReadDto> CreateGame([FromBody] GameCreateDto gameCreateDto)
    {
        try
        {
            var game = _mapper.Map<Game>(gameCreateDto);

            _repository.Create(game);
            _repository.SaveChanges();

            return Ok(_mapper.Map<GameReadDto>(game));
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }
}
