using System.Security.Policy;

namespace TheEmptyApp.Models;

public class Album {
    public int Id { get; set; }
    public string? Name { get; set; }

    public int? ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public DateOnly? ReleaseDate { get; set; }
    public ICollection<Song> Songs { get; set; } = new List<Song>();
    public string? CoverImageGuid { get; set; }
}