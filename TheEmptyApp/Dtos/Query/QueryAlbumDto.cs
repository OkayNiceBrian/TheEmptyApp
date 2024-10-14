namespace TheEmptyApp.Dtos.Query;

public class QueryAlbumDto {
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string ArtistName { get; set; }
    public required int SongCount { get; set; }
    public string? AlbumCoverGuid { get; set; }
}