using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Options;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("/api/options")]
[ApiController]
[Authorize]
public class OptionsController : ControllerBase {
    readonly UserManager<User> _um;
    readonly IArtistRepository _ar;
    public OptionsController(UserManager<User> um, IArtistRepository ar) {
        _um = um;
        _ar = ar;
    }

    [HttpPost]
    public async Task<IActionResult> GetOptions([FromBody] string userEmail) {
        var user = await _um.FindByEmailAsync(userEmail);

        if (user == null) {
            return BadRequest();
        }

        var artists = await _ar.GetByUserIdAsync(user.Id);
        var aDtos = artists.Select(a => a.ToArtistDto());
        var options = new OptionsDto {
            Artists = aDtos
        };
        return Ok(options);
    }
}