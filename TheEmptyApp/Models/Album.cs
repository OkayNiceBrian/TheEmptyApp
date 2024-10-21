using System.Security.Policy;

namespace TheEmptyApp.Models;

public class Album {
    public int Id { get; set; }
    public string? Name { get; set; }

    public int? ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public DateOnly? ReleaseDate { get; set; }
    public ICollection<Song> Songs { get; set; } = [];

    public string PrimaryGenre { get; set; } = string.Empty;
    public string SecondaryGenre { get; set; } = string.Empty;

    public bool IsPrivate { get; set; } = false;
    public List<User> AllowedUsers { get; } = [];

    public string CoverImageGuid { get; set; } = string.Empty;
}