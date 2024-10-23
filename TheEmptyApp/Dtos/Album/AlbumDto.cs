using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Dtos.Album;

public class AlbumDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public required int ArtistId { get; set; }
    public List<SongDto> Songs { get; set; } = [];
    public string ArtistName { get; set; } = string.Empty;
    public DateOnly? ReleaseDate { get; set; }
    public string PrimaryGenre { get; set; } = string.Empty;
    public string SecondaryGenre { get; set; } = string.Empty;
    public bool IsPrivate { get; set; } = false;
    public List<string> AllowedEmails { get; set; } = [];
    public string CoverImageGuid { get; set; } = string.Empty;
}