using AutoMapper;
using GamesMarketApi.Data;
using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GamesMarketApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration configuration;
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public UserController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            AppDbContext context,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponseDto>> Create(
            [FromBody] UserCreateDto userCreateDto)
        {
            var user = new User { UserName = userCreateDto.UserName, Email = userCreateDto.Email };
            var result = await userManager.CreateAsync(user, userCreateDto.Password);

            if (result.Succeeded)
            {
                return await BuildToken(new UserCredentialsDto()
                {
                    UserName = userCreateDto.UserName,
                    Password = userCreateDto.Password
                });
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponseDto>> Login(
            [FromBody] UserCredentialsDto userCredentialsDto)
        {
            var result = await signInManager.PasswordSignInAsync(userCredentialsDto.UserName,
                userCredentialsDto.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await BuildToken(userCredentialsDto);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }
        }

        [HttpPost("add-user-role")]
        public async Task<ActionResult> MakeAdmin([FromBody] UserCredentialsDto userCredentialsDto)
        {
            var user = await userManager.FindByNameAsync(userCredentialsDto.UserName);
            await userManager.AddClaimAsync(user, new Claim("role", "admin"));
            return NoContent();
        }

        private async Task<AuthenticationResponseDto> BuildToken(UserCredentialsDto userCredentials)
        {
            var user = await userManager.FindByNameAsync(userCredentials.UserName);
            var claimsDB = await userManager.GetClaimsAsync(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claimsDB,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponseDto()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
