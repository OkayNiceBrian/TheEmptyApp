using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface ISongRepository {
    Task<List<Song>> GetAllAsync();
    Task<Song?> GetByIdAsync(int id);
    Task<Song> CreateAsync(Song songModel);
    Task<Song?> UpdateAsync(int id, UpdateSongDto songDto);
    Task<Song?> DeleteAsync(int id);
}