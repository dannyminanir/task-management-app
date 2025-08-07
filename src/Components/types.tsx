// src/types.ts

export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Frontend' | 'Backend' | 'Meeting' | 'Design';
export type Status = 'Completed' | 'Incomplete';

export interface Task {
  id: string;
  taskName: string;
  priority: Priority;
  category: Category;
  dueDate: string; // ISO string format
  assignedUser: string;
  assignedOn: string;
  isCompleted: boolean;
}
