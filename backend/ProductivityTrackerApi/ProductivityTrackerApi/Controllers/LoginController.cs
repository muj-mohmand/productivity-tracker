using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("auth")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties
        {
            RedirectUri = "http://localhost:3000/tasks"
        }, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<IActionResult> GetUserAsync()
    {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (result.Succeeded)
            {
                // Retrieve user information from claims
                var claims = result.Principal.Identities.First().Claims;
                var userInfo = new
        {
                    Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                    Name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value
                };

                return Ok(userInfo); // Send user info back to the frontend
            }
            return Unauthorized();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}