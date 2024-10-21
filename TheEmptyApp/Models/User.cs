using Microsoft.AspNetCore.Identity;

namespace TheEmptyApp.Models;

public class User : IdentityUser {
    public List<Artist> Artists = [];
    public List<Song> LikedSongs { get; } = [];
    public List<Album> AllowedAlbums { get; } = [];
}