namespace TheEmptyApp.Models; 

public class Artist {
    public int Id { get; set; }
    public string? Name { get; set; }
    public required string UserId { get; set; }
    public ICollection<Album> Albums { get; set; } = new List<Album>();
}
