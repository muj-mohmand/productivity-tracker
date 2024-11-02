using Microsoft.EntityFrameworkCore;

namespace ProductivityTrackerApi.Models
{
    public class ProductivityTrackerContext : DbContext
    {
        public ProductivityTrackerContext(DbContextOptions<ProductivityTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> TaskItems { get; set; } = null!;
    }
}
