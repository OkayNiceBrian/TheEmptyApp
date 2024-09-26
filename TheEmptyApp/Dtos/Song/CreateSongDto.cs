namespace TheEmptyApp.Dtos.Song;

public class CreateSongDto {
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public int? AlbumId { get; set; }
    public string? AudioFileGuid { get; set; }
}
