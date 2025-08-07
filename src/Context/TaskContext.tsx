// src/context/TaskContext.tsx

import React, { createContext, useReducer, useContext, useEffect, type ReactNode } from 'react';
import type { Task } from '../Components/types';



type TaskState = {
  tasks: Task[];
};

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_COMPLETE'; payload: string }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'SET_TASKS'; payload: Task[] };

const initialState: TaskState = {
  tasks: [],
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'TOGGLE_COMPLETE':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      };
    case 'EDIT_TASK':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'SET_TASKS':
      return { tasks: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(storedTasks) });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
