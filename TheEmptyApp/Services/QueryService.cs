using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Data;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Models;

namespace TheEmptyApp.Services;

public class QueryService : IQueryService {
    readonly ApplicationDbContext _ctx;
    public QueryService(ApplicationDbContext ctx) => _ctx = ctx;

    public async Task<List<Artist>> QueryArtist(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Artists
            .Include(a => a.Albums)
            .Where(a => a.Name!.ToLower().Contains(queryString.ToLower())
            || a.Albums.Select(a => a.Name!.ToLower()).Contains(queryString.ToLower()) 
            || a.Albums.SelectMany(a => a.Songs.Select(s => s.Name!.ToLower())).ToList().Contains(queryString.ToLower()))
            .Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .ToListAsync();
    }
    public async Task<List<Album>> QueryAlbum(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Albums
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .Where(a => !a.IsPrivate)
            .Where(a => a.Name!.ToLower().Contains(queryString.ToLower())
            || a.Artist!.Name!.ToLower().Contains(queryString.ToLower())
            || a.Songs.Select(s => s.Name!.ToLower()).Contains(queryString.ToLower()))
            .Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .ToListAsync();
    }
    public async Task<List<Song>> QuerySong(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Songs
            .Include(s => s.Artist)
            .Include(s => s.Album)
            .Where(s => !s.Album!.IsPrivate)
            .Where(s => s.Name!.ToLower().Contains(queryString.ToLower()) 
            || s.Album!.Name!.ToLower().Contains(queryString.ToLower()) 
            || s.Artist!.Name!.ToLower().Contains(queryString.ToLower()))
            .Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .ToListAsync();
    }
}