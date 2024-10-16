namespace TheEmptyApp.Dtos.Query;

public class QueryAllDto {
    public List<QueryArtistDto> Artists { get; set; } = [];
    public List<QueryAlbumDto> Albums { get; set; } = [];
    public List<QuerySongDto> Songs { get; set; } = [];
}