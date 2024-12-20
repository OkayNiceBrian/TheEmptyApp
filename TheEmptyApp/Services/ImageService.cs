﻿using TheEmptyApp.Interfaces;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using TheEmptyApp.Options;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Azure;

namespace TheEmptyApp.Services;

public class ImageService : IImageService {
    readonly AzureOptions _ao;
    public ImageService(IOptions<AzureOptions> ao) => _ao = ao.Value;
    public async Task<string> UploadImageToStorage(IFormFile file) {
        var ext = Path.GetExtension(file.FileName);
        
        using MemoryStream fileUploadStream = new();
        file.CopyTo(fileUploadStream);
        fileUploadStream.Position = 0;

        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        var guid = "images/" + Guid.NewGuid().ToString() + ext;
        BlobClient bc = bcc.GetBlobClient(guid);

        await bc.UploadAsync(fileUploadStream, new BlobUploadOptions() {
            HttpHeaders = new BlobHttpHeaders {
                ContentType = "image/bitmap"
            }
        }, cancellationToken: default);
        
        return guid;
    }
    public async void UpdateImageInStorage(string guid, IFormFile file) {
        using MemoryStream fileUploadStream = new();
        file.CopyTo(fileUploadStream);
        fileUploadStream.Position = 0;

        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        BlobClient bc = bcc.GetBlobClient("images/" + guid);

        await bc.UploadAsync(fileUploadStream, new BlobUploadOptions() {
            HttpHeaders = new BlobHttpHeaders {
                ContentType = "image/bitmap"
            }
        }, cancellationToken: default);
    }

    public async Task<bool> DeleteImageFromStorage(string guid) {
        BlobContainerClient bcc = new(_ao.ConnectionString, _ao.Container);
        BlobClient bc = bcc.GetBlobClient(guid);
        var res = await bc.DeleteAsync();

        if (res.IsError)
            return false;

        return true;
    }
}