using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Models;
using TheEmptyApp.Mappers;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Interfaces;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace TheEmptyApp.Controllers;

[Route("api/songs")]
[ApiController]
[Authorize]
public class SongsController : ControllerBase {
    readonly ISongRepository _sr;
    public SongsController(ISongRepository sr) => _sr = sr;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs() {
        var s = await _sr.GetAllAsync();
        return Ok(s.Select(s => s.ToSongDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSong([FromRoute] int id) {
        var s = await _sr.GetByIdAsync(id);
        return s == null ? NotFound() : Ok(s.ToSongDto());
    }

    [HttpGet("likes")]
    public async Task<IActionResult> GetLikedSongs() {
        var u = User;
        if (u == null) return BadRequest();
        
        var uid = u.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        var s = await _sr.GetLikesAsync(u);
        return s == null ? NotFound() : Ok(s.Select(s => s.ToLikedSongDto()));
    }

    [HttpPost]
    public async Task<IActionResult> CreateSong([FromBody] CreateSongDto songDto) {
        var s = songDto.ToSongFromCreateDto();
        await _sr.CreateAsync(s);
        return CreatedAtAction(nameof(GetSong),
            new { id = s.Id }, s.ToSongDtoMin());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSong([FromRoute] int id, [FromBody] UpdateSongDto songDto) {
        var s = await _sr.UpdateAsync(id, songDto);
        return s == null ? NotFound() : Ok(s.ToSongDto());
    }

    [HttpPut("like/{id}")]
    public async Task<IActionResult> LikeSong([FromRoute] int id) {
        var u = User;
        var s = await _sr.LikeSong(id, u);
        if (s == null) return BadRequest();
        var sDto = s.ToSongDto();
        sDto.isLikedByUser = true;
        return Ok(sDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSong([FromRoute] int id) {
        await _sr.DeleteAsync(id);
        return NoContent();
    }
}