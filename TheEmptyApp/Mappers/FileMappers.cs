using TheEmptyApp.Dtos.Files;

namespace TheEmptyApp.Mappers;

public static class FileMappers {
    public static FileGuidDto ToFileGuidDto(string guid) {
        return new FileGuidDto {
            Guid = guid
        };
    }
}