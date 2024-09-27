using Azure;

namespace TheEmptyApp.Interfaces;

public interface IImageService {
    Task<string> UploadImageToStorage(IFormFile file);
    Task<bool> DeleteImageFromStorage(string guid);
}