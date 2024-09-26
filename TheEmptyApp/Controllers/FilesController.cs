﻿using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Files;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Controllers;


[Route("api/files")]
[ApiController]
public class FilesController : ControllerBase {
    readonly IImageService _is;
    readonly IAudioService _as;
    public FilesController(IImageService imageService, IAudioService audioService) {
        _is = imageService;
        _as = audioService;
    }

    [HttpPost("images")]
    public async Task<IActionResult> UploadImage(UploadImageDto imageDto) {
        var guid = await _is.UploadImageToStorage(imageDto.File);
        return Ok(FileMappers.ToFileGuidDto(guid));
    }

    [HttpPost("audio")]
    public async Task<IActionResult> UploadAudio(UploadAudioDto audioDto) {
        if (Path.GetExtension(audioDto.File.FileName) != ".mp3") 
            return new UnsupportedMediaTypeResult();

        var guid = await _as.UploadAudioToStorage(audioDto.File);
        return Ok(FileMappers.ToFileGuidDto(guid));
    }
}