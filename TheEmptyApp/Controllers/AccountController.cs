using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheEmptyApp.Dtos.Account;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Models;

namespace TheEmptyApp.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase {
    readonly UserManager<User> _um;
    readonly SignInManager<User> _sm;
    readonly ITokenService _ts;
    public AccountController(UserManager<User> um, SignInManager<User> sm, ITokenService ts) {
        _um = um;
        _sm = sm;
        _ts = ts;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto) {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _um.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName.ToLower());

        if (user == null)
            return Unauthorized("Invalid username.");

        var res = await _sm.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!res.Succeeded)
            return Unauthorized("username does not exist or password was incorrect.");

        return Ok(new NewUserDto {
            Email = user.Email!,
            UserName = user.UserName!,
            Token = _ts.CreateToken(user)
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto) {
        try {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User {
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var createdUser = await _um.CreateAsync(user, registerDto.Password);

            if (createdUser.Succeeded) {
                var roleResult = await _um.AddToRoleAsync(user, "User");
                return roleResult.Succeeded ? Ok(new NewUserDto { 
                    Email = user.Email, 
                    UserName = user.UserName, 
                    Token = _ts.CreateToken(user) 
                }) : StatusCode(500, roleResult.Errors);
            } else {
                return StatusCode(500, createdUser.Errors);
            }
        } catch (Exception e) {
            return StatusCode(500, e);
        }
    }
}