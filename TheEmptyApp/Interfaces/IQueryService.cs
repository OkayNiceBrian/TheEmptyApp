using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface IQueryService {
    Task<List<Artist>> QueryArtist(string queryString, int pagesToSkip, int itemsPerPage);
    Task<List<Album>> QueryAlbum(string queryString, int pagesToSkip, int itemsPerPage);
    Task<List<Song>> QuerySong(string queryString, int pagesToSkip, int itemsPerPage);
}