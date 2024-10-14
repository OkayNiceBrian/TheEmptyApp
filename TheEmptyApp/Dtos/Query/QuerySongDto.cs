namespace TheEmptyApp.Dtos.Query;

public class QuerySongDto {
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string ArtistName { get; set; }
    public required string AlbumName { get; set; }
    public string? Duration { get; set; } // TODO: Get duration in Song Model
}