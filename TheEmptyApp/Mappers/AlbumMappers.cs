using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class AlbumMappers {
    public static AlbumDto ToAlbumDto(this Album albumModel) {
        return new AlbumDto {
            Id = albumModel.Id,
            Name = albumModel.Name,
            ArtistId = albumModel.ArtistId,
            ArtistName = albumModel.Artist?.Name!,
            Songs = albumModel.Songs.Select(s => s.ToSongDto()).ToList(),
            ReleaseDate = albumModel.ReleaseDate,
            PrimaryGenre = albumModel.PrimaryGenre,
            SecondaryGenre = albumModel.SecondaryGenre,
            AllowedEmails = albumModel.AllowedUsers.Select(u => u.Email).ToList()!,
            IsPrivate = albumModel.IsPrivate,
            CoverImageGuid = albumModel.CoverImageGuid,
        };
    }

    public static Album ToAlbumFromCreateDto(this CreateAlbumDto albumDto) {
        return new Album {
            Name = albumDto.Name,
            ArtistId = albumDto.ArtistId,
            ReleaseDate = albumDto.ReleaseDate,
            PrimaryGenre = albumDto.PrimaryGenre,
            SecondaryGenre = albumDto.SecondaryGenre,
            IsPrivate = albumDto.IsPrivate,
            CoverImageGuid = albumDto.CoverImageGuid,
        };
    }

    public static void UpdateModelFromDto(this Album albumModel, UpdateAlbumDto albumDto) {
        albumModel.Name = albumDto.Name;
        albumModel.ArtistId = albumDto.ArtistId;
        albumModel.ReleaseDate = albumDto.ReleaseDate;
        albumModel.PrimaryGenre = albumDto.PrimaryGenre;
        albumModel.SecondaryGenre = albumDto.SecondaryGenre;
        albumModel.IsPrivate = albumDto.IsPrivate;
        albumModel.CoverImageGuid = albumDto.CoverImageGuid;
    }
}