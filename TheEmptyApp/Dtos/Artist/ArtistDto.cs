using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Dtos.Song;

namespace TheEmptyApp.Dtos.Artist;

public class ArtistDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<AlbumDto>? Albums { get; set; }
    public List<SongDto>? Songs { get; set; }
}