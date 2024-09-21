namespace TheEmptyApp.Models; 

public class Artist {
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Album> Albums { get; set; } = new List<Album>();
    public ICollection<Song> Songs { get; set; } = new List<Song>();
}
