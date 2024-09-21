using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Repository;

public class AlbumRepository : IAlbumRepository {
    readonly ApplicationDbContext _ctx;
    public AlbumRepository(ApplicationDbContext ctx) => _ctx = ctx;

    public async Task<List<Album>> GetAllAsync() {
        return await _ctx.Albums.ToListAsync();
    }

    public async Task<Album?> GetByIdAsync(int id) {
        return await _ctx.Albums.FindAsync(id);
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
        await _ctx.SaveChangesAsync();
        return am;
    }

    public async Task<Album?> DeleteAsync(int id) {
        var am = await _ctx.Albums.FirstOrDefaultAsync(a => a.Id == id);
        if (am == null) return null;

        _ctx.Albums.Remove(am);
        await _ctx.SaveChangesAsync();
        return am;
    }
}