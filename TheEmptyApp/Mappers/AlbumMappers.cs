using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class AlbumMappers {
    public static AlbumDto ToAlbumDto(this Album albumModel) {
        return new AlbumDto {
            Id = albumModel.Id,
            Name = albumModel.Name,
            ArtistId = albumModel.ArtistId,
            Songs = albumModel.Songs.Select(s => s.ToSongDto()).ToList(),
            ReleaseDate = albumModel.ReleaseDate,
            CoverImageGuid = albumModel.CoverImageGuid,
        };
    }

    public static Album ToAlbumFromCreateDto(this CreateAlbumDto albumDto) {
        return new Album {
            Name = albumDto.Name,
            ArtistId = albumDto.ArtistId,
            ReleaseDate = albumDto.ReleaseDate,
            CoverImageGuid = albumDto.CoverImageGuid,
        };
    }

    public static void UpdateModelFromDto(this Album albumModel, UpdateAlbumDto albumDto) {
        albumModel.Name = albumDto.Name;
        albumModel.ArtistId = albumDto.ArtistId;
        albumModel.ReleaseDate = albumDto.ReleaseDate;
        albumModel.CoverImageGuid = albumDto.CoverImageGuid;
    }
}