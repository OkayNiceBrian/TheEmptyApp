namespace TheEmptyApp.Dtos.Song;

public class UpdateSongDto {
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public int? AlbumId { get; set; }
    public int? TrackNum { get; set; }
}