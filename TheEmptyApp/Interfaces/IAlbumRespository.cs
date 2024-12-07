using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Helpers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface IAlbumRepository {
    Task<List<Album>> GetAllAsync();
    Task<List<Album>> GetRecentAsync(string genre);
    Task<Album?> GetByIdAsync(int id);
    Task<Album> CreateAsync(Album albumModel);
    Task<Album?> UpdateAsync(int id, UpdateAlbumDto albumDto);
    Task<Album?> DeleteAsync(int id);
}