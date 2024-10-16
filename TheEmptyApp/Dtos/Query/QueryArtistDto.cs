namespace TheEmptyApp.Dtos.Query;

public class QueryArtistDto {
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required int AlbumCount { get; set; }
    public string? ArtistImageGuid { get; set; }
}
