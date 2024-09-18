using Microsoft.EntityFrameworkCore;

namespace TheEmptyApp.Models;

public class MusicDbContext : DbContext {
    public MusicDbContext(DbContextOptions<MusicDbContext> options) : base(options) {}

    public DbSet<Song> Songs { get; set; } = null!;
    public DbSet<Artist> Artists { get; set; } = null!;
    public DbSet<Album> Albums { get; set; } = null!;
}