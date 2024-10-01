using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class ArtistMappers {
    public static ArtistDto ToArtistDto(this Artist artistModel) {
        return new ArtistDto {
            Id = artistModel.Id,
            Name = artistModel.Name,
            Albums = artistModel.Albums.Select(a => a.ToAlbumDto()).ToList(),
            UserId = artistModel.UserId
        };
    }

    public static Artist ToArtistFromCreateDto(this CreateArtistDto artistDto, string userId) {
        return new Artist {
            Name = artistDto.Name,
            UserId = userId,
        };
    }

    public static void UpdateModelFromDto(this Artist artistModel, UpdateArtistDto artistDto) {
        artistModel.Name = artistDto.Name;
    }
}