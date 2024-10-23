using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using TheEmptyApp.Dtos.Files;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Options;

namespace TheEmptyApp.Services;

public class AudioService : IAudioService {
    readonly AzureOptions _ao;
    public AudioService(IOptions<AzureOptions> ao) => _ao = ao.Value;

    public async Task<Stream> StreamAudioFromStorage(string guid) {
        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        BlobClient bc = bcc.GetBlobClient(guid);
        return await bc.OpenReadAsync();
    }

    public async Task<string> UploadAudioToStorage(IFormFile file) {
        var ext = Path.GetExtension(file.FileName);

        using MemoryStream fileUploadStream = new();
        file.CopyTo(fileUploadStream);
        fileUploadStream.Position = 0;

        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        var guid = "audio/" + Guid.NewGuid().ToString() + ext;
        BlobClient bc = bcc.GetBlobClient(guid);

        await bc.UploadAsync(fileUploadStream, new BlobUploadOptions() {
            HttpHeaders = new BlobHttpHeaders {
                ContentType = "audio/mpeg"
            }
        }, cancellationToken: default);

        return guid;
    }

    public async void UpdateAudioInStorage(string guid, IFormFile file) {
        using MemoryStream fileUploadStream = new();
        file.CopyTo(fileUploadStream);
        fileUploadStream.Position = 0;

        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        BlobClient bc = bcc.GetBlobClient(guid);

        await bc.UploadAsync(fileUploadStream, new BlobUploadOptions() {
            HttpHeaders = new BlobHttpHeaders {
                ContentType = "audio/mpeg"
            }
        }, cancellationToken: default);
    }

    public async Task<bool> DeleteAudioFromStorage(string guid) {
        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        BlobClient bc = bcc.GetBlobClient(guid);
        var res = await bc.DeleteAsync();

        if (res.IsError)
            return false;

        return true;
    }
}