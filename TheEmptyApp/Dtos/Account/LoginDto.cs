﻿using System.ComponentModel.DataAnnotations;

namespace TheEmptyApp.Dtos.Account;

public class LoginDto {
    [Required]
    public required string UserName { get; set; }
    
    [Required]
    public required string Password { get; set; }
}