using Microsoft.EntityFrameworkCore;
using ProductivityTrackerApi.Models;

namespace ProductivityTrackerApi.Models
{
    public class ProductivityTrackerContext : DbContext
    {
        public ProductivityTrackerContext(DbContextOptions<ProductivityTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> TaskItems { get; set; } = null!;
        public DbSet<ProductivityTrackerApi.Models.User> User { get; set; } = default!;
    }
}
