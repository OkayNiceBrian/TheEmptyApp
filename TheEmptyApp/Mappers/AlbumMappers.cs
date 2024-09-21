using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class AlbumMappers {
    public static AlbumDto ToAlbumDto(this Album albumModel) {
        return new AlbumDto {
            Id = albumModel.Id,
            Name = albumModel.Name,
            ArtistId = albumModel.ArtistId
        };
    }

    public static Album ToAlbumFromCreateDto(this CreateAlbumDto albumDto) {
        return new Album {
            Name = albumDto.Name,
            ArtistId = albumDto.ArtistId,
        };
    }

    public static void UpdateModelFromDto(this Album albumModel, UpdateAlbumDto albumDto) {
        albumModel.Name = albumDto.Name;
        albumModel.ArtistId = albumDto.ArtistId;
    }
}