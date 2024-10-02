using System.ComponentModel.DataAnnotations;
using TheEmptyApp.Models;

namespace TheEmptyApp.Dtos.Account;

public class UserDto {
    [EmailAddress]
    public required string Email { get; set; }
    public required string UserName { get; set; }
    public required string Token { get; set; }
    public List<Models.Artist> Artists { get; set; } = [];

}