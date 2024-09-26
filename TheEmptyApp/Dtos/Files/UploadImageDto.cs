namespace TheEmptyApp.Dtos.Files;

public class UploadImageDto {
    public string? Name { get; set; }
    public required IFormFile File { get; set; }
}