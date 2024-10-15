using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Data;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Models;

namespace TheEmptyApp.Services;

public class QueryService : IQueryService {
    readonly ApplicationDbContext _ctx;
    public QueryService(ApplicationDbContext ctx) => _ctx = ctx;

    public async Task<List<Artist>> QueryArtist(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Artists.Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .Include(a => a.Albums)
            .ToListAsync();
    }
    public async Task<List<Album>> QueryAlbum(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Albums.Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .OrderByDescending(a => a.ReleaseDate)
            .ToListAsync();
    }
    public async Task<List<Song>> QuerySong(string queryString, int pagesToSkip, int itemsPerPage) {
        return await _ctx.Songs.Where(s => s.Name!.ToLower().Contains(queryString.ToLower()))
            .Skip(pagesToSkip * itemsPerPage).Take(itemsPerPage)
            .Include(s => s.Artist)
            .Include(s => s.Album)
            .OrderByDescending(s => s.Album!.ReleaseDate)
            .ToListAsync();
    }
}