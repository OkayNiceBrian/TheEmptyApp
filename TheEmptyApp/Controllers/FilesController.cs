﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheEmptyApp.Dtos.Files;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Mappers;

namespace TheEmptyApp.Controllers;


[Route("api/files")]
[ApiController]
[Authorize]
public class FilesController : ControllerBase {
    readonly IImageService _is;
    readonly IAudioService _as;
    readonly ISongRepository _sr;
    public FilesController(IImageService imageService, IAudioService audioService, ISongRepository sr) {
        _is = imageService;
        _as = audioService;
        _sr = sr;
    }

    [HttpPost("images")]
    public async Task<IActionResult> UploadImage(UploadImageDto imageDto) {
        var guid = await _is.UploadImageToStorage(imageDto.File);
        return Ok(FileMappers.ToFileGuidDto(guid));
    }

    [HttpPost("audio")]
    public async Task<IActionResult> UploadAudio(UploadAudioDto audioDto) {
        var guid = await _as.UploadAudioToStorage(audioDto.File);
        return Ok(FileMappers.ToFileGuidDto(guid));
    }

    [HttpPost("audio/stream")]
    public async Task<IActionResult> StreamAudio([FromBody] FileGuidDto guidDto) {
        var s = await _as.StreamAudioFromStorage(guidDto.Guid!);
        await _sr.AddListen(guidDto.Guid!);
        return Ok(s);
    }
}