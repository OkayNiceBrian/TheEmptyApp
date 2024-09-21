using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface IAlbumRepository {
    Task<List<Album>> GetAllAsync();
    Task<Album?> GetByIdAsync(int id);
    Task<Album> CreateAsync(Album albumModel);
    Task<Album?> UpdateAsync(int id, UpdateAlbumDto albumDto);
    Task<Album?> DeleteAsync(int id);
}