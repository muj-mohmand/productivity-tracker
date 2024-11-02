using Microsoft.VisualBasic;

namespace ProductivityTrackerApi.Models
{
    public class TaskItem
    {
        public long Id { get; set; }
        public string? UserId { get; set; }
        public bool IsComplete { get; set; }
        public required string Description { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}
