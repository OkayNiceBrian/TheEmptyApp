namespace TheEmptyApp.Dtos.Song;

public class UpdateSongDto {
    public string? Name { get; set; }
    public required int ArtistId { get; set; }
    public required int AlbumId { get; set; }
    public int? TrackNum { get; set; }
}