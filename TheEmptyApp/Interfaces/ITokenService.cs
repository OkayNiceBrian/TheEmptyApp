using TheEmptyApp.Models;

namespace TheEmptyApp.Interfaces;

public interface ITokenService {
    string CreateToken(User user);
}