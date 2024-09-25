using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Files;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Controllers;


[Route("api/files")]
[ApiController]
public class FilesController : ControllerBase {
    readonly IImageService _is;
    public FilesController(IImageService imageService) => _is = imageService;

    [HttpPost("images")]
    public async Task<IActionResult> UploadImage(UploadImageDto imageDto) {
        var guid = await _is.UploadImageToStorage(imageDto.File);
        return Ok(FileMappers.ToFileGuidDto(guid));
    }
}