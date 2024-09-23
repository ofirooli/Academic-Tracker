import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  return (
    <div className="container"> {/* Apply container class for layout */}
      <h2 className="page-header">Tasks</h2> {/* Apply page-header for consistent heading style */}
      <ul className="task-list"> {/* Apply task-list class for styling the list */}
        {tasks.map(task => (
          <li key={task._id} className="task-item"> {/* Apply task-item class for individual task styling */}
            {task.task} - Due: {new Date(task.taskDueDate).toLocaleDateString()} - Status: {task.taskStatus}
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default TaskList;
