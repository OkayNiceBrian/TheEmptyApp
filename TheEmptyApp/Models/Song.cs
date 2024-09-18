namespace TheEmptyApp.Models;

public class Song {
    public long Id { get; set; }
    public string? Name { get; set; }

    public long ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public long AlbumId { get; set; }
    public Album? Album { get; set; }
}