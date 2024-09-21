using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Dtos.Album;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/albums")]
[ApiController]
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
        var a = await _ar.GetByIdAsync(id);
        return a == null ? NotFound() : Ok(a.ToAlbumDto());
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