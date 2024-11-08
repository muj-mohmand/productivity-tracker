using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityTrackerApi.Models;
using Microsoft.Extensions.Logging;


namespace ProductivityTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly ProductivityTrackerContext _context;
        private readonly ILogger<TaskItemsController> _logger;

        public TaskItemsController(ProductivityTrackerContext context, ILogger<TaskItemsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        //// GET: api/TaskItems
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItems()
        //{
        //    _logger.LogInformation("Getting all task items."); // Logging line added
        //    return await _context.TaskItems.ToListAsync();
        //}

        // GET: api/TaskItems/5
        [HttpGet("{id:long}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(long id)
        {
            _logger.LogInformation("Getting task item with id {Id}", id); // Logging line added

            var taskItem = await _context.TaskItems.FindAsync(id);

            if (taskItem == null)
            {
                _logger.LogWarning("Task item with id {Id} not found", id); // Logging line added

                return NotFound();
            }

            return taskItem;
        }

        //GET: api/TaskItems/userId
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItemsForUser([FromQuery]string email)
        {
            if (string.IsNullOrEmpty(email)) {
                _logger.LogInformation("Getting all task items."); // Logging line added
                return await _context.TaskItems.ToListAsync();
            }

            var userTaskItems = await _context.TaskItems
           .Where(task => task.UserId == email)
           .ToListAsync();

            if (userTaskItems == null)
                return NotFound();

            return Ok(userTaskItems);

        }

        // PUT: api/TaskItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(long id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                _logger.LogWarning("Task item ID mismatch: {Id} != {TaskItemId}", id, taskItem.Id); // Logging line added
                return BadRequest();
            }

            _context.Entry(taskItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Task item with id {Id} updated successfully", id); // Logging line added

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                {
                    _logger.LogWarning("Task item with id {Id} not found during update", id); // Logging line added
                    return NotFound();
                }
                else
                {
                    _logger.LogError("Concurrency error occurred while updating task item with id {Id}", id); // Logging line added
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaskItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItem taskItem)
        {
            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Task item created with id {Id}", taskItem.Id); // Logging line added
            _logger.LogInformation("Task item created with UserId {UserId}", taskItem.UserId);
            _logger.LogInformation("taskItem info: {taskItem}", taskItem);

            return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
        }

        // DELETE: api/TaskItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(long id)
        {
            _logger.LogInformation("Deleting task item with id {Id}", id); // Logging line added
            var taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem == null)
            {
                _logger.LogWarning("Task item with id {Id} not found for deletion", id); // Logging line added
                return NotFound();
            }

            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Task item with id {Id} deleted successfully", id); // Logging line added


            return NoContent();
        }

        private bool TaskItemExists(long id)
        {
            return _context.TaskItems.Any(e => e.Id == id);
        }
    }
}
