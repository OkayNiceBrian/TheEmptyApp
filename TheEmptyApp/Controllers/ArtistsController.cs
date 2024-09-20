using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/artists")]
[ApiController]
public class ArtistsController : ControllerBase {
    readonly ApplicationDbContext _ctx;

    public ArtistsController(ApplicationDbContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artist>>> GetArtists() {
        return await _ctx.Artists.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArtist([FromRoute] int id) {
        var artist = await _ctx.Artists.FindAsync(id);
        return artist == null ? NotFound() : Ok(artist);
    }
}