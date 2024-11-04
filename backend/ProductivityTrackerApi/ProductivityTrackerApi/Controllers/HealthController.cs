using Microsoft.AspNetCore.Mvc;

[ApiController]
public class HealthController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Check()
    {
        return Ok(new { status = "healthy" });
    }
}