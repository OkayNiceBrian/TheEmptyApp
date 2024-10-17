using System.Security.Claims;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface ISongRepository {
    Task<bool> AddListen(string guid);
    Task<List<Song>> GetAllAsync();
    Task<List<Song>> GetLikesAsync(ClaimsPrincipal user);
    Task<Song?> GetByIdAsync(int id);
    Task<Song> CreateAsync(Song songModel);
    Task<Song?> UpdateAsync(int id, UpdateSongDto songDto);
    Task<Song?> LikeSong(int id, ClaimsPrincipal user);
    Task<Song?> DeleteAsync(int id);
}