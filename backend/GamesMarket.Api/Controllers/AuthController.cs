using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Api.Extensions;
using GamesMarket.Domain.Entities;
using GamesMarket.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GamesMarket.Api.Controllers
{
    [Route("v1/auth")]
    public class AuthController : MainController
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppSettings _appSettings;
        private readonly IUserService _userService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public AuthController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IOptions<AppSettings> appSettings,
            IUserService userService,
            IMapper mapper,
            ILogger<AuthController> logger,
            INotificator notificator,
            IUser user) : base(notificator, user)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _userService = userService;
            _appSettings = appSettings.Value;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResponseDto>> Register(
            [FromBody] UserCreateDto userCreateDto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var identityUser = new IdentityUser
            {
                UserName = userCreateDto.UserName,
                Email = userCreateDto.Email,
                EmailConfirmed = true
            };
            var result = await _userManager.CreateAsync(identityUser, userCreateDto.Password);

            if (result.Succeeded)
            {
                // Create a user in different table
                var user = _mapper.Map<User>(userCreateDto);
                await _userService.CreateUser(user);

                // Sign in and return token
                await _signInManager.SignInAsync(identityUser, false);
                return CustomResponse(await BuildToken(identityUser.UserName));
            }
            foreach (var error in result.Errors)
            {
                NotifyError(error.Description);
            }

            return CustomResponse(userCreateDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponseDto>> Login(
            [FromBody] UserCredentialsDto userCredentialsDto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var result = await _signInManager.PasswordSignInAsync(userCredentialsDto.UserName,
                userCredentialsDto.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                _logger.LogInformation("User " + userCredentialsDto.UserName + " logged successfully");
                return CustomResponse(await BuildToken(userCredentialsDto.UserName));
            }
            if (result.IsLockedOut)
            {
                NotifyError("User is temporarily blocked");
                return CustomResponse(userCredentialsDto);
            }

            NotifyError("Incorrect username or password");
            return CustomResponse(userCredentialsDto);
        }

        private async Task<AuthenticationResponseDto> BuildToken(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpirationHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            var encodedToken = tokenHandler.WriteToken(token);

            var response = new AuthenticationResponseDto
            {
                AccessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpirationHours).TotalSeconds,
                UserToken = new UserTokenDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    Claims = claims.Select(c => new ClaimDto { Type = c.Type, Value = c.Value })
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
