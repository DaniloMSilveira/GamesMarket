using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GamesMarket.Api.Controllers
{
    [Route("v1/users")]
    public class UserController : MainController
    {
        private readonly IUserService _service;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public UserController(
            IUserService service,
            IMapper mapper,
            ILogger<AuthController> logger,
            INotificator notificator,
            IUser user) : base(notificator, user)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("{id:guid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserReadDto>> GetUserById(Guid id)
        {
            var user = await _service.GetUserById(id);

            if (user == null) return NotFound();

            return Ok(_mapper.Map<UserReadDto>(user));
        }

        [HttpPut("{id:guid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserReadDto>> UpdateUser(Guid id, UserEditDto userDto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var user = await _service.GetUserById(id);
            if (user == null) return NotFound();

            await _service.UpdateUser(_mapper.Map(userDto, user));
            return CustomResponse(_mapper.Map<UserReadDto>(user));
        }
    }
}
