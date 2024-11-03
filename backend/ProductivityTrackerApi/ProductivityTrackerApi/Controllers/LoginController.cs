using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;



namespace ProductivityTrackerApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class LoginController : Controller
    {
        [HttpGet("login")]
        public async Task Login() => await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme, new AuthenticationProperties
        {
            RedirectUri = Url.Action("GoogleResponse")
        });


        [HttpGet("sign-google")] // This should match the CallbackPath set in Program.cs
        public async Task<IActionResult> GoogleResponse()
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



    }
}
