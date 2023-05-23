using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public AuthController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            ILogger<AuthController> logger,
            INotificator notificator,
            IUser user) : base(notificator, user)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResponseDto>> Register(
            [FromBody] UserCreateDto userCreateDto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var user = new IdentityUser
            {
                UserName = userCreateDto.UserName,
                Email = userCreateDto.Email,
                EmailConfirmed = true
            };
            var result = await _userManager.CreateAsync(user, userCreateDto.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return CustomResponse(await BuildToken(user.UserName));
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

            claims.Add(new Claim("UserName", user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(2);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponseDto()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
