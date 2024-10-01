namespace TheEmptyApp.Dtos.Account;

public class NewUserDto {
    public required string Email { get; set; }
    public required string UserName { get; set; }
    public required string Token { get; set; }
}