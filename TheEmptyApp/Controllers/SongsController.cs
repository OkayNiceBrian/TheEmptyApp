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

namespace TheEmptyApp.Controllers;

[Route("api/songs")]
[ApiController]
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
        var song = await _sr.GetByIdAsync(id);
        return song == null ? NotFound() : Ok(song.ToSongDto());
    }

    [HttpPost]
    public async Task<IActionResult> CreateSong([FromBody] CreateSongDto songDto) {
        var s = songDto.ToSongFromCreateDto();
        await _sr.CreateAsync(s);
        return CreatedAtAction(nameof(GetSong),
            new { id = s.Id }, s.ToSongDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSong([FromRoute] int id, [FromBody] UpdateSongDto songDto) {
        var s = await _sr.UpdateAsync(id, songDto);
        return s == null ? NotFound() : Ok(s.ToSongDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSong([FromRoute] int id) {
        await _sr.DeleteAsync(id);
        return NoContent();
    }
}