using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Models;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Repository;

public class ArtistRepository : IArtistRepository {
    readonly ApplicationDbContext _ctx;
    public ArtistRepository(ApplicationDbContext ctx) => _ctx = ctx;

    public async Task<List<Artist>> GetAllAsync() {
        return await _ctx.Artists.ToListAsync();
    }

    public async Task<Artist?> GetByIdAsync(int id) {
        return await _ctx.Artists.FindAsync(id);
    }

    public async Task<Artist> CreateAsync(Artist artistModel) {
        _ctx.Add(artistModel);
        await _ctx.SaveChangesAsync();
        return artistModel;
    }
    public async Task<Artist?> UpdateAsync(int id, UpdateArtistDto artistDto) {
        var am = await _ctx.Artists.FirstOrDefaultAsync(a => a.Id == id);
        if (am == null) return null;

        am.UpdateModelFromDto(artistDto);
        await _ctx.SaveChangesAsync();
        return am;
    }

    public async Task<Artist?> DeleteAsync(int id) {
        var am = await _ctx.Artists.FirstOrDefaultAsync(a => a.Id == id);
        if (am == null) return null;

        _ctx.Artists.Remove(am);
        await _ctx.SaveChangesAsync();
        return am;
    }
}