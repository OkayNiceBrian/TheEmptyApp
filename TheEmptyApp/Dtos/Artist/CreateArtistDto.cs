using System.ComponentModel.DataAnnotations;

namespace TheEmptyApp.Dtos.Artist;

public class CreateArtistDto {
    public string? Name { get; set; }

    [EmailAddress]
    public required string Email { get; set; }
}