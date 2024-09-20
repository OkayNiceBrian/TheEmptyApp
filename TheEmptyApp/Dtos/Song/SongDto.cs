namespace TheEmptyApp.Dtos.Song;

public class SongDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public int? AlbumId { get; set; }
}