using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
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
    public AlbumRepository(ApplicationDbContext ctx, IImageService imageService, ISongRepository sr) {
        _ctx = ctx;
        _is = imageService;
        _sr = sr;
    } 

    public async Task<List<Album>> GetAllAsync() {
        return await _ctx.Albums.Include(s => s.Songs).ToListAsync();
    }

    public async Task<Album?> GetByIdAsync(int id) {
        return await _ctx.Albums.Include(s => s.Songs).FirstOrDefaultAsync(a => a.Id == id);
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