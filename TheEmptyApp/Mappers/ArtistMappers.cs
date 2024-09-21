using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Models;

namespace TheEmptyApp.Mappers;

public static class ArtistMappers {
    public static ArtistDto ToArtistDto(this Artist artistModel) {
        return new ArtistDto {
            Id = artistModel.Id,
            Name = artistModel.Name,
            Albums = artistModel.Albums.Select(a => a.ToAlbumDto()).ToList(),
            Songs = artistModel.Songs.Select(a =>a.ToSongDto()).ToList(),
        };
    }

    public static Artist ToArtistFromCreateDto(this CreateArtistDto artistDto) {
        return new Artist {
            Name = artistDto.Name
        };
    }

    public static void UpdateModelFromDto(this Artist artistModel, UpdateArtistDto artistDto) {
        artistModel.Name = artistDto.Name;
    }
}