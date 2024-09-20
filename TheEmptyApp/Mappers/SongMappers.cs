using Microsoft.CodeAnalysis.CSharp.Syntax;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class SongMappers {
    public static SongDto ToSongDto(this Song songModel) {
        return new SongDto {
            Id = songModel.Id,
            Name = songModel.Name,
            ArtistId = songModel.ArtistId,
            AlbumId = songModel.AlbumId
        };
    }

    public static Song ToSongFromCreateDto(this CreateSongDto songDto) {
        return new Song {
            Name = songDto.Name,
            ArtistId = songDto.ArtistId,
            AlbumId = songDto.AlbumId
        };
    }

    public static void UpdateModelFromDto(this Song songModel, UpdateSongDto songDto) {
        songModel.Name = songDto.Name;
        songModel.ArtistId = songDto.ArtistId;
        songModel.AlbumId = songDto.AlbumId;
    }
}