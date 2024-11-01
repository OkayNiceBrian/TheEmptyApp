using Xunit;
using Moq;
using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Models;
using TheEmptyApp.Data;
using TheEmptyApp.Repository;
using TheEmptyApp.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace TheEmptyApp.Tests.Repository;

public class SongRepositoryTests {
    [Fact]
    public async Task TestCreateAsync() {
        var mockSet = new Mock<DbSet<Song>>();

        var mockOptions = new Mock<DbContextOptions<ApplicationDbContext>>();
        var mockCtx = new Mock<ApplicationDbContext>(mockOptions.Object);
        mockCtx.Setup(m => m.Songs).Returns(mockSet.Object);

        var mockAudioService = new Mock<AudioService>();
        var mockUserManager = new Mock<UserManager<User>>();

        var sr = new SongRepository(mockCtx.Object, mockAudioService.Object, mockUserManager.Object);
        await sr.CreateAsync(new Song {
            Name = "Test",
            TrackNum = 1,
            Duration = (float)120.0,
            ArtistId = 1,
            AlbumId = 1,
            AudioFileGuid = "asdf-ghjk-zxcv-bnm"
        });

        mockSet.Verify(m => m.Add(It.IsAny<Song>()), Times.Once());
        mockCtx.Verify(m => m.SaveChanges(), Times.Once());
    }
}