using TheEmptyApp.Dtos.Query;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class QueryMappers { 
    public static QueryArtistDto ToQueryArtistDto(this Artist artist) {
        return new QueryArtistDto {
            Id = artist.Id,
            Name = artist.Name!,
            AlbumCount = artist.Albums.Count
        };
    }
    public static QueryAlbumDto ToQueryAlbumDto(this Album album) {
        return new QueryAlbumDto {
            Id = album.Id,
            Name = album.Name!,
            ArtistId = (int) album.ArtistId!,
            ArtistName = album.Artist?.Name!,
            SongCount = album.Songs.Count,
            AlbumCoverGuid = album.CoverImageGuid
        };
    }
    public static QuerySongDto ToQuerySongDto(this Song song) {
        return new QuerySongDto {
            Id = song.Id,
            Name = song.Name!,
            ArtistId = (int) song.ArtistId!,
            ArtistName = song.Artist?.Name!,
            AlbumId = (int) song.AlbumId!,
            AlbumName = song.Album?.Name!,
        };
    }
}
