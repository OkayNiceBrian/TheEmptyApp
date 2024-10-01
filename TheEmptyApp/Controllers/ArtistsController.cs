using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/artists")]
[ApiController]
[Authorize]
public class ArtistsController : ControllerBase {
    readonly IArtistRepository _ar;
    readonly UserManager<User> _um;
    public ArtistsController(IArtistRepository ar, UserManager<User> um) {
        _ar = ar;
        _um = um;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArtistDto>>> GetArtists() {
        var a = await _ar.GetAllAsync();
        return Ok(a.Select(a => a.ToArtistDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArtist([FromRoute] int id) {
        var a = await _ar.GetByIdAsync(id);
        return a == null ? NotFound() : Ok(a.ToArtistDto());
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateArtist([FromBody] CreateArtistDto artistDto) {
        var u = await _um.FindByEmailAsync(artistDto.Email);
        if (u == null)
            return BadRequest();

        var a = artistDto.ToArtistFromCreateDto(u.Id);
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