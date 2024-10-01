﻿using Microsoft.AspNetCore.Identity;

namespace TheEmptyApp.Models;

public class User : IdentityUser {
    public List<Artist> Artists = [];
}