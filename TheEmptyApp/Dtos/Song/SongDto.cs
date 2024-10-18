namespace TheEmptyApp.Dtos.Song;

public class SongDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? ArtistId { get; set; }
    public int? AlbumId { get; set; }
    public int? TrackNum { get; set; }
    public float? Duration { get; set; }
    public uint? Listens { get; set; }
    public bool isLikedByUser { get; set; } = false;
    public string? AudioFileGuid { get; set; }
}