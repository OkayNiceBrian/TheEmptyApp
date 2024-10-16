namespace TheEmptyApp.Models;

public class Song {
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? TrackNum { get; set; }
    public uint? Listens { get; set; } = 0;

    public int? ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public int? AlbumId { get; set; }
    public Album? Album { get; set; }

    public string? AudioFileGuid { get; set; }
}