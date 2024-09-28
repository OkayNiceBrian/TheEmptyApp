using TheEmptyApp.Dtos.Files;

namespace TheEmptyApp.Interfaces;

public interface IAudioService {
    Task<string> UploadAudioToStorage(IFormFile file);
    Task<bool> DeleteAudioFromStorage(string guid);
}