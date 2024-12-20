﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Models;

namespace TheEmptyApp.Data;

public class ApplicationDbContext : IdentityDbContext<User> {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public virtual DbSet<Song> Songs { get; set; } = null!;
    public virtual DbSet<Artist> Artists { get; set; } = null!;
    public virtual DbSet<Album> Albums { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder) {
        builder.Entity<Album>()
            .HasMany(e => e.AllowedUsers)
            .WithMany(e => e.AllowedAlbums)
            .UsingEntity<AllowedAlbumUser>();

        base.OnModelCreating(builder);

        List<IdentityRole> roles = [
            new IdentityRole {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole {
                Name = "User",
                NormalizedName = "USER"
            },
        ];
        builder.Entity<IdentityRole>().HasData(roles);
    }
}