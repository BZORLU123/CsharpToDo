using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static readonly List<TodoApi.Models.Task> Tasks = new List<TodoApi.Models.Task>();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TodoApi.Models.Task>> GetTasks()
        {
            return Ok(Tasks);
        }

        [HttpPost]
        public ActionResult<TodoApi.Models.Task> AddTask([FromBody] TodoApi.Models.Task task)
        {
            task.Id = _nextId++;
            Tasks.Add(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpGet("{id}")]
        public ActionResult<TodoApi.Models.Task> GetTaskById(int id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, [FromBody] TodoApi.Models.Task updatedTask)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Name = updatedTask.Name;
            task.Done = updatedTask.Done;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            Tasks.Remove(task);
            return NoContent();
        }
    }
}