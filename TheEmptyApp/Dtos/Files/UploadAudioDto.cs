namespace TheEmptyApp.Dtos.Files;

public class UploadAudioDto {
    public string? Name { get; set; }
    public required IFormFile File { get; set; }
}