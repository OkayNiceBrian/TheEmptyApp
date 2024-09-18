namespace TheEmptyApp.Models;

public class Album {
    public long Id { get; set; }
    public string? Name { get; set; }

    public long ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public ICollection<Song>? Songs { get; set; }
}