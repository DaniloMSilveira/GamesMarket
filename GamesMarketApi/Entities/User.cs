using System.ComponentModel.DataAnnotations;
using GamesMarketApi.Enums;
using Microsoft.AspNetCore.Identity;

namespace GamesMarketApi.Entities
{
    public class User : IdentityUser
    {
        public User() : base() { }
    }
}