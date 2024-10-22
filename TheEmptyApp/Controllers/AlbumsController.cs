using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Data.Static;
using System.Security.Claims;
using TheEmptyApp.Dtos.Song;
using TheEmptyApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace TheEmptyApp.Controllers;

[Route("api/albums")]
[ApiController]
[Authorize]
public class AlbumsController : ControllerBase {
    readonly IAlbumRepository _ar;
    readonly UserManager<User> _um;
    public AlbumsController(IAlbumRepository ar, UserManager<User> um) {
        _ar = ar;
        _um = um;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums() {
        var a = await _ar.GetAllAsync();
        return Ok(a.Select(a => a.ToAlbumDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAlbum([FromRoute] int id) {
        var u = User.Identity as ClaimsIdentity;
        if (u == null) return NotFound();

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

    [HttpGet("edit/{id}")]
    public async Task<ActionResult> GetAlbumToEdit([FromRoute] int id) {
        var u = User.Identity as ClaimsIdentity;
        var am = await _ar.GetByIdAsync(id);
        if (u == null || am == null) return NotFound();

        var uid = u.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        if (uid != am.Artist!.UserId) return Unauthorized();

        var aDto = am.ToAlbumDto();
        aDto.Songs.OrderBy(s => s.TrackNum);
        return Ok(aDto);
    }

    [HttpGet("genres")]
    public IActionResult GetGenres() {
        return Ok(Genres.GenreList);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAlbum([FromBody] CreateAlbumDto albumDto) {
        var a = albumDto.ToAlbumFromCreateDto();

        foreach (string email in albumDto.AllowedEmails) {
            if (!email.IsNullOrEmpty()) {
                var u = await _um.FindByEmailAsync(email);
                if (u != null) a.AllowedUsers.Add(u); 
            }
        }

        await _ar.CreateAsync(a);
        return CreatedAtAction(nameof(GetAlbum), new { id = a.Id }, a.ToAlbumDto());
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