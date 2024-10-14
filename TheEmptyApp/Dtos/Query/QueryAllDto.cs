namespace TheEmptyApp.Dtos.Query;

public class QueryAllDto {
    public IEnumerable<QueryArtistDto> Artists = [];
    public IEnumerable<QueryAlbumDto> Albums = [];
    public IEnumerable<QuerySongDto> Songs = [];
}