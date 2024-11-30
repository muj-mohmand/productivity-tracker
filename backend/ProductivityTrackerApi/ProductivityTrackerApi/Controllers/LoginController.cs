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
            RedirectUri = "auth/callback"
        }, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("callback")]
    public IActionResult Callback()
    {
        // After successful authentication, redirect to the tasks page
        return Redirect("https://productivity-tracker-livid.vercel.app/tasks");
    }

    [Authorize]
    [HttpGet("user")]
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
        Response.Cookies.Delete(".AspNetCore.Cookies");
        return Ok();
    }
}