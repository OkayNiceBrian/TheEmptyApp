namespace TheEmptyApp.Dtos.Song;

public class SongDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public required int ArtistId { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    public required int AlbumId { get; set; }
    public string AlbumName { get; set; } = string.Empty;
    public int? TrackNum { get; set; }
    public float? Duration { get; set; }
    public uint? Listens { get; set; }
    public bool isLikedByUser { get; set; } = false;
    public string? AudioFileGuid { get; set; }
    public string? CoverImageGuid { get; set; }
}