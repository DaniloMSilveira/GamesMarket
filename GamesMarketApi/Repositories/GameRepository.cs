using GamesMarketApi.Data;
using GamesMarketApi.Models;
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

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Game> GetAll()
        {
            return _context.Games.ToList();
        }

        public Game GetById(int id)
        {
            return _context.Games.FirstOrDefault(item => item.Id == id);
        }

        public void Create(Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            _context.Games.Add(game);
        }
    }
}
