﻿namespace TheEmptyApp.Models;

public class Album {
    public int Id { get; set; }
    public string? Name { get; set; }

    public int? ArtistId { get; set; }
    public Artist? Artist { get; set; }

    public ICollection<Song> Songs { get; set; } = new List<Song>();
}