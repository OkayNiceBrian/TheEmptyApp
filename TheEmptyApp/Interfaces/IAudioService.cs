using TheEmptyApp.Dtos.Files;

namespace TheEmptyApp.Interfaces;

public interface IAudioService {
    Task<Stream> StreamAudioFromStorage(string guid);
    Task<string> UploadAudioToStorage(IFormFile file);
    Task<bool> DeleteAudioFromStorage(string guid);
}