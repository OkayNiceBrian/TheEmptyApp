using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface IArtistRepository {
    Task<List<Artist>> GetAllAsync();
    Task<Artist?> GetByIdAsync(int id);
    Task<Artist> CreateAsync(Artist artistModel);
    Task<Artist?> UpdateAsync(int id, UpdateArtistDto songDto);
    Task<Artist?> DeleteAsync(int id);
}