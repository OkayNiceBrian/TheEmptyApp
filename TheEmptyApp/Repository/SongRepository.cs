using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TheEmptyApp.Data;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Repository;

public class SongRepository : ISongRepository {
    readonly ApplicationDbContext _ctx;
    readonly UserManager<User> _um;
    readonly IAudioService _as;
    public SongRepository(ApplicationDbContext ctx, IAudioService auds, UserManager<User> um) {
        _ctx = ctx;
        _as = auds;
        _um = um;
    }

    public async Task<bool> AddListen(string guid) {
        var s = await _ctx.Songs.FirstOrDefaultAsync(s => s.AudioFileGuid == guid);
        if (s == null)
            return false;

        s.Listens++;
        await _ctx.SaveChangesAsync();
        return true;
    }

    public async Task<List<Song>> GetAllAsync() {
        return await _ctx.Songs
            .Include(s => s.Album)
            .Include(s => s.Artist)
            .ToListAsync();
    }

    public async Task<List<Song>> GetLikesAsync(ClaimsPrincipal user) {
        var u = await _um.GetUserAsync(user);

        return await _ctx.Songs
            .Include(s => s.Album)
            .Include(s => s.Artist)
            .Include(s => s.LikedByUsers)
            .Where(s => s.LikedByUsers.Contains(u!))
            .ToListAsync();
    }

    public async Task<Song?> GetByIdAsync(int id) {
        return await _ctx.Songs
            .Include(s => s.Album)
            .Include(s => s.Artist)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Song> CreateAsync(Song songModel) {
        _ctx.Add(songModel);
        await _ctx.SaveChangesAsync();
        return songModel;
    }
    public async Task<Song?> UpdateAsync(int id, UpdateSongDto songDto) {
        var sm = await _ctx.Songs.FirstOrDefaultAsync(s => s.Id == id);
        if (sm == null) return null;

        sm.UpdateModelFromDto(songDto);
        await _ctx.SaveChangesAsync();
        return sm;
    }

    public async Task<Song?> LikeSong(int id, ClaimsPrincipal user) {
        var sm = await _ctx.Songs.Include(s => s.Album).Include(s => s.Artist).FirstOrDefaultAsync(s => s.Id == id);
        var u = await _um.GetUserAsync(user);
        if (sm == null || u == null) return null;
        sm.LikedByUsers.Add(u);
        await _ctx.SaveChangesAsync();
        return sm;
    }

    public async Task<Song?> DeleteAsync(int id) {
        var sm = await _ctx.Songs.FirstOrDefaultAsync(s => s.Id == id);
        if (sm == null) return null;

        if (sm.AudioFileGuid != null && sm.AudioFileGuid != string.Empty) {
            await _as.DeleteAudioFromStorage(sm.AudioFileGuid);
        }

        _ctx.Songs.Remove(sm);
        await _ctx.SaveChangesAsync();
        return sm;
    }

}