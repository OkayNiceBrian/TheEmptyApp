namespace TheEmptyApp.Models; 

public class Artist {
    public long Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Album>? Albums { get; set; }
    public ICollection<Song>? Songs { get; set; }
}
