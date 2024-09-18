using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/songs")]
[ApiController]
public class SongsController : ControllerBase {
    readonly ApplicationDbContext _ctx;

    public SongsController(ApplicationDbContext ctx) => _ctx = ctx;

    [HttpGet]
    public IActionResult GetAll() {
        var songs = _ctx.Songs.ToList();
        return Ok(songs);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id) {
        var song = _ctx.Songs.Find(id);

        if (song == null) return NotFound();

        return Ok(song);
    }
}