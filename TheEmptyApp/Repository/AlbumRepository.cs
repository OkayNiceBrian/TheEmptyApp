using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using TheEmptyApp.Data;
using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Repository;

public class AlbumRepository : IAlbumRepository {
    readonly ApplicationDbContext _ctx;
    readonly IImageService _is;
    readonly ISongRepository _sr;
    readonly UserManager<User> _um;
    public AlbumRepository(ApplicationDbContext ctx, IImageService imageService, ISongRepository sr, UserManager<User> um) {
        _ctx = ctx;
        _is = imageService;
        _sr = sr;
        _um = um;
    } 

    public async Task<List<Album>> GetAllAsync() {
        return await _ctx.Albums.Include(a => a.Songs).Include(a => a.AllowedUsers).ToListAsync();
    }

    public async Task<List<Album>> GetRecentAsync(string genre) {
        const int albumsToTake = 5;
        return await _ctx.Albums
            .Where(a => !a.IsPrivate)
            .Where(a => genre == "recent" ? true : a.PrimaryGenre == genre || a.SecondaryGenre == genre)
            .OrderByDescending(a => a.ReleaseDate)
            .Take(albumsToTake)
            .Include(a => a.Artist)
            .ToListAsync();
    }

    public async Task<Album?> GetByIdAsync(int id) {
        return await _ctx.Albums
            .Include(a => a.AllowedUsers)
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .ThenInclude(s => s.LikedByUsers)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Album> CreateAsync(Album albumModel) {
        _ctx.Add(albumModel);
        await _ctx.SaveChangesAsync();
        return albumModel;
    }
    public async Task<Album?> UpdateAsync(int id, UpdateAlbumDto albumDto) {
        var am = await _ctx.Albums.FirstOrDefaultAsync(a => a.Id == id);
        if (am == null) return null;

        am.UpdateModelFromDto(albumDto);
        foreach (string email in albumDto.AllowedEmails) {
            if (!am.AllowedUsers.Select(u => u.Email).ToList().Contains(email)) {
                var u = await _um.FindByEmailAsync(email);
                if (u != null) am.AllowedUsers.Add(u);
            }
        }
        await _ctx.SaveChangesAsync();
        return am;
    }

    public async Task<Album?> DeleteAsync(int id) {
        var am = await _ctx.Albums.FirstOrDefaultAsync(a => a.Id == id);
        if (am == null) return null;

        var rsp = true;
        if (am.CoverImageGuid != null && am.CoverImageGuid != string.Empty) {
            rsp = await _is.DeleteImageFromStorage(am.CoverImageGuid);
            if (rsp) {
                am.CoverImageGuid = "";
                await _ctx.SaveChangesAsync();
            }
        }

        if (rsp) {
            var ls = _ctx.Songs.Where(s => s.AlbumId == am.Id).ToList();
            foreach (Song s in ls) {
                await _sr.DeleteAsync(s.Id);
            }

            _ctx.Albums.Remove(am);
            await _ctx.SaveChangesAsync();
        }

        return am;
    }
}