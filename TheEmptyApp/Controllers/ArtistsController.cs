using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Dtos.Artist;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Controllers;

[Route("api/artists")]
[ApiController]
public class ArtistsController : ControllerBase {
    readonly IArtistRepository _ar;
    public ArtistsController(IArtistRepository ar) => _ar = ar;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArtistDto>>> GetArtists() {
        var a = await _ar.GetAllAsync();
        return Ok(a.Select(a => a.ToArtistDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArtist([FromRoute] int id) {
        var artist = await _ar.GetByIdAsync(id);
        return artist == null ? NotFound() : Ok(artist.ToArtistDto());
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateArtist([FromBody] CreateArtistDto artistDto) {
        var a = artistDto.ToArtistFromCreateDto();
        await _ar.CreateAsync(a);
        return CreatedAtAction(nameof(GetArtist),
            new { id = a.Id }, a.ToArtistDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArtist([FromRoute] int id, [FromBody] UpdateArtistDto artistDto) {
        var a = await _ar.UpdateAsync(id, artistDto);
        return a == null ? NotFound() : Ok(a.ToArtistDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArtist([FromRoute] int id) {
        await _ar.DeleteAsync(id);
        return NoContent();
    }
}