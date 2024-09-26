using Microsoft.AspNetCore.Mvc;

namespace TheEmptyApp.Interfaces;

public interface IAudioService {
    Task<string> UploadAudioToStorage(IFormFile file);
}