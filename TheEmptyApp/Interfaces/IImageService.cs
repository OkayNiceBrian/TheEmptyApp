namespace TheEmptyApp.Interfaces;

public interface IImageService {
    Task<string> UploadImageToStorage(IFormFile file);
}