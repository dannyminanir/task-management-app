// src/components/TaskForm.tsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTaskContext } from '../Context/TaskContext';
import type { Category, Priority, Task } from './types';

const TaskForm: React.FC = () => {
  const { dispatch } = useTaskContext();

  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<Priority>('Low');
  const [category, setCategory] = useState<Category>('Frontend');
  const [dueDate, setDueDate] = useState('');
  const [assignedUser, setAssignedUser] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !assignedUser) return;

    const newTask: Task = {
      id: uuidv4(),
      taskName,
      priority,
      category,
      dueDate,
      assignedUser,
      assignedOn: new Date().toISOString(),
      isCompleted: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });

    // Reset form
    setTaskName('');
    setPriority('Low');
    setCategory('Frontend');
    setDueDate('');
    setAssignedUser('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Add New Task</h2>

      <input
        type="text"
        placeholder="Task Name"
        className="w-full p-2 border rounded"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />

      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Meeting">Meeting</option>
        <option value="Design">Design</option>
      </select>

      <input
        type="date"
        className="w-full p-2 border rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Assigned User"
        className="w-full p-2 border rounded"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
