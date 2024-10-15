using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TheEmptyApp.Dtos.Query;
using TheEmptyApp.Helpers;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Controllers;

[ApiController]
[Authorize]
[Route("api/query")]
public class QueryController : ControllerBase {
    readonly IQueryService _qs;
    public QueryController(IQueryService qs) => _qs = qs;

    [HttpPost]
    public async Task<IActionResult> Query([FromBody] QueryObject query) {
        if (!QueryObject.ValidSearchTypes.Contains(query.SearchType))
            return BadRequest("Invalid Search Type.");

        switch (query.SearchType) {
            case "artist":
                var ars = await _qs.QueryArtist(query.QueryString, query.PageNumber - 1, query.ItemsPerPage);
                return Ok(ars.Select(a => a.ToQueryArtistDto()));
            case "album":
                var als = await _qs.QueryAlbum(query.QueryString, query.PageNumber - 1, query.ItemsPerPage);
                return Ok(als.Select(a => a.ToQueryAlbumDto()));
            case "song":
                var ss = await _qs.QuerySong(query.QueryString, query.PageNumber - 1, query.ItemsPerPage);
                return Ok(ss.Select(s => s.ToQuerySongDto()));
        }

        var artists = await _qs.QueryArtist(query.QueryString, 0, 5);
        var albums = await _qs.QueryAlbum(query.QueryString, 0, 5);
        var songs = await _qs.QuerySong(query.QueryString, 0, 5);

        var qad = new QueryAllDto {
            Artists = artists.Select(a => a.ToQueryArtistDto()).ToList(),
            Albums = albums.Select(a => a.ToQueryAlbumDto()).ToList(),
            Songs = songs.Select(s => s.ToQuerySongDto()).ToList()
        };
        return Ok(qad);
    }
}