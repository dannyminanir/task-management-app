// src/components/TaskList.tsx

import React from 'react';
import { useTaskContext } from '../Context/TaskContext';
import type { Task } from './types';

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const handleToggleComplete = (id: string) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: id });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task: Task) => (
            <li
              key={task.id}
              className={`p-3 border rounded flex justify-between items-center ${
                task.isCompleted ? 'bg-green-100' : 'bg-gray-50'
              }`}
            >
              <div>
                <p className="font-bold">{task.taskName}</p>
                <p className="text-sm text-gray-600">
                  {task.category} • {task.priority} • Assigned to {task.assignedUser}
                </p>
                <p className="text-sm text-gray-400">
                  Due: {task.dueDate || 'N/A'} • Assigned On: {new Date(task.assignedOn).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  className={`px-2 py-1 rounded text-white ${
                    task.isCompleted ? 'bg-yellow-500' : 'bg-green-600'
                  }`}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.isCompleted ? 'Mark Incomplete' : 'Complete'}
                </button>

                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
