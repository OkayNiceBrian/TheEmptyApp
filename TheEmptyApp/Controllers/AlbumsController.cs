using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Data.Static;
using System.Security.Claims;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/albums")]
[ApiController]
[Authorize]
public class AlbumsController : ControllerBase {
    readonly IAlbumRepository _ar;
    public AlbumsController(IAlbumRepository ar) => _ar = ar;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums() {
        var a = await _ar.GetAllAsync();
        return Ok(a.Select(a => a.ToAlbumDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAlbum([FromRoute] int id) {
        var u = User.Identity as ClaimsIdentity;
        if (u == null)
            return NotFound();

        var uid = u.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        var a = await _ar.GetByIdAsync(id);
        if (a == null) return NotFound();
        var aDto = a.ToAlbumDto();
        aDto.Songs.OrderBy(s => s.TrackNum);
        foreach (Song s in a.Songs) {
            if (s.LikedByUsers.Select(u => u.Id).Contains(uid)) {
                aDto.Songs.FirstOrDefault(sDto => sDto.Id == s.Id)!.isLikedByUser = true;
            }
        }
        return Ok(aDto);
    }

    [HttpGet("genres")]
    public IActionResult GetGenres() {
        return Ok(Genres.GenreList);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAlbum([FromBody] CreateAlbumDto albumDto) {
        var a = albumDto.ToAlbumFromCreateDto();
        await _ar.CreateAsync(a);
        return CreatedAtAction(nameof(GetAlbum),
            new { id = a.Id }, a.ToAlbumDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAlbum([FromRoute] int id, [FromBody] UpdateAlbumDto albumDto) {
        var a = await _ar.UpdateAsync(id, albumDto);
        return a == null ? NotFound() : Ok(a.ToAlbumDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlbum([FromRoute] int id) {
        await _ar.DeleteAsync(id);
        return NoContent();
    }
}