using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<MusicDbContext>(opt => 
    opt.UseInMemoryDatabase("EmptyMusic"));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapControllers();

app.Run();
