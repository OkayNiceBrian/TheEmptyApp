namespace TheEmptyApp.Dtos.Album;

public class UpdateAlbumDto {
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public DateOnly? ReleaseDate { get; set; }
    public string CoverImageGuid { get; set; } = string.Empty;
}