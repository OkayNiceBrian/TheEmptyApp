using Azure;

namespace TheEmptyApp.Interfaces;

public interface IImageService {
    Task<string> UploadImageToStorage(IFormFile file);
    void UpdateImageInStorage(string guid, IFormFile file);
    Task<bool> DeleteImageFromStorage(string guid);
}