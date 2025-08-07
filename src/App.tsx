// src/App.tsx

import React from 'react';
import { TaskProvider } from './Context/TaskContext';
import TaskFilters from './Components/TaskFilters';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';


const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Team Task Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="md:col-span-1">
            <TaskForm />
          </div>
          <div className="md:col-span-2">
            <TaskFilters />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
