using TheEmptyApp.Dtos.Song;

namespace TheEmptyApp.Dtos.Album;

public class AlbumDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public List<SongDto> Songs { get; set; } = [];
    public DateOnly? ReleaseDate { get; set; }
    public string? CoverImageGuid { get; set; }
}