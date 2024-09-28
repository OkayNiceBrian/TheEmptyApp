using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Repository;

public class SongRepository : ISongRepository {
    readonly ApplicationDbContext _ctx;
    readonly IAudioService _as;
    public SongRepository(ApplicationDbContext ctx, IAudioService auds) {
        _ctx = ctx;
        _as = auds;
    }

    public async Task<List<Song>> GetAllAsync() {
        return await _ctx.Songs.ToListAsync();
    }

    public async Task<Song?> GetByIdAsync(int id) {
        return await _ctx.Songs.FindAsync(id);
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