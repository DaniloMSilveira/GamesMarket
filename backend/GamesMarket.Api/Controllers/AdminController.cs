using AutoMapper;
using GamesMarket.Api.Dtos;
using GamesMarket.Domain.Interfaces;
using GamesMarket.Domain.Repositories;
using GamesMarket.Infra.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GamesMarket.Api.Controllers
{
    [Route("v1/admin")]
    public class AdminController: MainController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppDbContext _context;

        public AdminController(
            UserManager<IdentityUser> userManager,
            AppDbContext context,
            INotificator notificator,
            IUser user) : base(notificator, user)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("list-users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<List<AdminListUsersDto>>> GetListUsers()
        {
            var users = await _context.Users.ToListAsync();
            var list = new List<AdminListUsersDto>();
            foreach (var user in users)
            {
                var claims = await _userManager.GetClaimsAsync(user);
                list.Add(new AdminListUsersDto { 
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = claims.Select(x => x.Value),
            });
            }
            return list;
        }

        [HttpPost("change-roles")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> MakeAdmin([FromBody] AdminChangeRolesDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);
            var claims = dto.Roles.Select(item => new Claim("role", item));

            await _userManager.RemoveClaimsAsync(user, await _userManager.GetClaimsAsync(user));
            await _userManager.AddClaimsAsync(user, claims);
            return NoContent();
        }
    }
}
