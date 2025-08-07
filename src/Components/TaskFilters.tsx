// src/components/TaskFilters.tsx

import React, { useState, useMemo } from 'react';
import { useTaskContext } from '../Context/TaskContext';


const TaskFilters: React.FC = () => {
  const { state } = useTaskContext();
  const { tasks } = state;

  const [status, setStatus] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [priority, setPriority] = useState<string>('All');
  const [category, setCategory] = useState<string>('All');
  const [due, setDue] = useState<string>('All');
  const [assignedUser, setAssignedUser] = useState<string>('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchStatus =
        status === 'All' || (status === 'Completed' && task.isCompleted) || (status === 'Incomplete' && !task.isCompleted);

      const matchPriority = priority === 'All' || task.priority === priority;
      const matchCategory = category === 'All' || task.category === category;
      const matchUser = !assignedUser || task.assignedUser.toLowerCase().includes(assignedUser.toLowerCase());

      let matchDue = true;
      if (due !== 'All') {
        const today = new Date();
        const taskDue = new Date(task.dueDate);

        switch (due) {
          case 'Overdue':
              task.dueDate && taskDue < today;
            break;
          case 'Today':
            
              task.dueDate &&
              taskDue.getDate() === today.getDate() &&
              taskDue.getMonth() === today.getMonth() &&
              taskDue.getFullYear() === today.getFullYear();
            break;
          case 'Upcoming':
              task.dueDate && taskDue > today;
            break;
          case 'No Due Date':
            matchDue = !task.dueDate;
            break;
        }
      }

      return matchStatus && matchPriority && matchCategory && matchUser && matchDue;
    });
  }, [status, priority, category, due, assignedUser, tasks]);

  // Show only filtered count (this will be passed to <TaskList /> if filtering is centralized)
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Filter Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select className="p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <select className="p-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Meeting">Meeting</option>
          <option value="Design">Design</option>
        </select>

        <select className="p-2 border rounded" value={due} onChange={(e) => setDue(e.target.value)}>
          <option value="All">All Due Dates</option>
          <option value="Overdue">Overdue</option>
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="No Due Date">No Due Date</option>
        </select>

        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Assigned User"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        />
      </div>

      <p className="mt-4 text-gray-600">Showing {filteredTasks.length} matching task(s)</p>
    </div>
  );
};

export default TaskFilters;
