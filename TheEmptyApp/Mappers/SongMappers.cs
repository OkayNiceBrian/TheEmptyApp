using Microsoft.CodeAnalysis.CSharp.Syntax;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class SongMappers {
    public static SongDto ToSongDto(this Song songModel) {
        return new SongDto {
            Id = songModel.Id,
            Name = songModel.Name,
            TrackNum = songModel.TrackNum,
            ArtistId = songModel.ArtistId,
            AlbumId = songModel.AlbumId,
            AudioFileGuid = songModel.AudioFileGuid
        };
    }

    public static Song ToSongFromCreateDto(this CreateSongDto songDto) {
        return new Song {
            Name = songDto.Name,
            TrackNum = songDto.TrackNum,
            ArtistId = songDto.ArtistId,
            AlbumId = songDto.AlbumId,
            AudioFileGuid = songDto.AudioFileGuid
        };
    }

    public static void UpdateModelFromDto(this Song songModel, UpdateSongDto songDto) {
        songModel.Name = songDto.Name;
        songModel.TrackNum = songDto.TrackNum;
        songModel.ArtistId = songDto.ArtistId;
        songModel.AlbumId = songDto.AlbumId;
    }
}