namespace TheEmptyApp.Dtos.Album;

public class UpdateAlbumDto {
    public string? Name { get; set; }
    public required int ArtistId { get; set; }
    public DateOnly? ReleaseDate { get; set; }
    public string PrimaryGenre { get; set; } = string.Empty;
    public string SecondaryGenre { get; set; } = string.Empty;
    public bool IsPrivate { get; set; } = false;
    public List<string> AllowedEmails { get; set; } = [];
    public string CoverImageGuid { get; set; } = string.Empty;
}