namespace TheEmptyApp.Dtos.Artist;

public class CreateArtistDto {
    public string? Name { get; set; }
    public required string UserId { get; set; }
}