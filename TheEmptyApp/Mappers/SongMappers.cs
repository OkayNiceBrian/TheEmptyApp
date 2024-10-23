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
            Duration = songModel.Duration,
            ArtistId = songModel.ArtistId,
            ArtistName = songModel.Artist!.Name!,
            AlbumId = songModel.AlbumId,
            AlbumName = songModel.Album!.Name!,
            Listens = songModel.Listens,
            AudioFileGuid = songModel.AudioFileGuid,
            CoverImageGuid = songModel.Album!.CoverImageGuid,
        };
    }

    public static LikedSongDto ToLikedSongDto(this Song songModel) {
        return new LikedSongDto {
            Id = songModel.Id,
            Name = songModel.Name,
            TrackNum = songModel.TrackNum,
            Duration = songModel.Duration,
            ArtistId = songModel.ArtistId,
            ArtistName = songModel.Artist!.Name!,
            AlbumId = songModel.AlbumId,
            AlbumName = songModel.Album!.Name!,
            Listens = songModel.Listens,
            isLikedByUser = true,
            AudioFileGuid = songModel.AudioFileGuid,
            CoverImageGuid = songModel.Album.CoverImageGuid,
        };
    }

    public static Song ToSongFromCreateDto(this CreateSongDto songDto) {
        return new Song {
            Name = songDto.Name,
            TrackNum = songDto.TrackNum,
            Duration = songDto.Duration,
            ArtistId = songDto.ArtistId,
            AlbumId = songDto.AlbumId,
            AudioFileGuid = songDto.AudioFileGuid
        };
    }
    public static SongDto ToSongDtoMin(this Song songModel) {
        return new SongDto {
            Id = songModel.Id,
            Name = songModel.Name,
            TrackNum = songModel.TrackNum,
            Duration = songModel.Duration,
            ArtistId = songModel.ArtistId,
            AlbumId = songModel.AlbumId,
            Listens = songModel.Listens,
            AudioFileGuid = songModel.AudioFileGuid,
        };
    }

    public static void UpdateModelFromDto(this Song songModel, UpdateSongDto songDto) {
        songModel.Name = songDto.Name;
        songModel.TrackNum = songDto.TrackNum;
        songModel.ArtistId = songDto.ArtistId;
        songModel.AlbumId = songDto.AlbumId;
    }
}