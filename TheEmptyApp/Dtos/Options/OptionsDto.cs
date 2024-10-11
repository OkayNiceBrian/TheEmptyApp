using TheEmptyApp.Dtos.Artist;

namespace TheEmptyApp.Dtos.Options;

public class OptionsDto {
    public IEnumerable<ArtistDto> Artists { get; set; } = [];
}