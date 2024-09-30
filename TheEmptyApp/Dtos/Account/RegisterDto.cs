using System.ComponentModel.DataAnnotations;

namespace TheEmptyApp.Dtos.Account;

public class RegisterDto {
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string UserName { get; set; }

    [Required]
    public required string Password { get; set; }
}