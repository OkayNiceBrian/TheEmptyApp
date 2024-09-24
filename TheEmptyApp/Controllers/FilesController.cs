using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Files;
using TheEmptyApp.Interfaces;

namespace TheEmptyApp.Controllers;

public class FilesController : ControllerBase {
    readonly IImageService _is;
    public FilesController(IImageService imageService) => _is = imageService;

    [HttpPost]
    public async Task<IActionResult> UploadImage(UploadImageDto imageDto) {
        var guid = await _is.UploadImageToStorage(imageDto.File);
        return Ok(guid);
    }
}