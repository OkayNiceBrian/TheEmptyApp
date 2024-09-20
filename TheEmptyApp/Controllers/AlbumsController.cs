using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/albums")]
[ApiController]
public class AlbumsController : ControllerBase {
    readonly ApplicationDbContext _ctx;

    public AlbumsController(ApplicationDbContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Album>>> GetAlbums() {
        return await _ctx.Albums.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAlbum([FromRoute] int id) {
        var album = await _ctx.Albums.FindAsync(id);
        return album == null ? NotFound() : Ok(album);
    }
}