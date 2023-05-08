using AutoMapper;
using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;
using GamesMarketApi.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    public async Task<ActionResult<IEnumerable<GameReadDto>>> GetGames([FromQuery] PaginationDto paginationDto)
    {
        try
        {
            var games = await _repository.GetAll();

            return Ok(_mapper.Map<IEnumerable<GameReadDto>>(games));
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }

    [HttpGet("{id}", Name = "GetGameById")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]
    public async Task<ActionResult<GameReadDto>> GetGameById(int id)
    {
        try 
        { 
            var game = await _repository.GetById(id);
            if (game == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GameReadDto>(game));
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<GameReadDto>> CreateGame([FromBody] GameCreateDto gameCreateDto)
    {
        try
        {
            var game = _mapper.Map<Game>(gameCreateDto);

            await _repository.CreateAsync(game);

            return Ok(_mapper.Map<GameReadDto>(game));
        }
        catch (Exception error)
        {
            _logger.LogError(error.Message);
            return Problem(error.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<GameReadDto>> UpdateGame(int id, [FromBody] GameCreateDto gameCreateDto)
    {
        var game = await _repository.GetById(id);

        if (game == null)
        {
            return NotFound();
        }

        game = _mapper.Map(gameCreateDto, game);

        await _repository.UpdateAsync(game);
        return Ok(_mapper.Map<GameReadDto>(game));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> RemoveGame(int id)
    {
        var game = await _repository.GetById(id);

        if (game == null)
        {
            return NotFound();
        }

        await _repository.RemoveAsync(game);
        return NoContent();
    }
}
