using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TheEmptyApp.Interfaces;
using TheEmptyApp.Models;

namespace TheEmptyApp.Services;

public class TokenService : ITokenService {
    readonly IConfiguration _cfg;
    readonly SymmetricSecurityKey _key;
    public TokenService(IConfiguration cfg) {
        _cfg = cfg;
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["JWT:SigningKey"]!));
    }

    public string CreateToken(User user) {
        var claims = new List<Claim> {
            new(JwtRegisteredClaimNames.Email, user.Email!),
            new(JwtRegisteredClaimNames.GivenName, user.UserName!)
        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var td = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds,
            Issuer = _cfg["JWT:Issuer"],
            Audience = _cfg["JWT:Audience"]
        };

        var th = new JwtSecurityTokenHandler();
        var token = th.CreateToken(td);

        return th.WriteToken(token);
    }
}