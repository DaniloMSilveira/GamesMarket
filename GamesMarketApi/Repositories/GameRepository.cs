using AutoMapper;
using GamesMarketApi.Data;
using GamesMarketApi.Dtos;
using GamesMarketApi.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;

namespace GamesMarketApi.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly AppDbContext _context;

        public GameRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Game>> GetByPagination(PaginationDto paginationDto)
        {
            return await _context.Games.ToListAsync();
        }
        public async Task<IEnumerable<Game>> GetAll()
        {
            return await _context.Games.ToListAsync();
        }

        public async Task<Game> GetById(int id)
        {
            return await _context.Games.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task CreateAsync(Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();
        }

        public Task RemoveAsync(Game game)
        {
            _context.Games.Remove(game);
            return _context.SaveChangesAsync();
        }

        public Task UpdateAsync(Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            _context.Games.Update(game);
            return _context.SaveChangesAsync();
        }
    }
}
