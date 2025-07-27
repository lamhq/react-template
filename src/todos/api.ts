import axios from 'axios';
import { withErrorHandling } from '../error';

// Types matching the OpenAPI spec
export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoDto = {
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
};

export type UpdateTodoDto = Partial<Pick<Todo, 'title' | 'description' | 'status'>>;

// Create a new todo
export async function createTodo(data: CreateTodoDto): Promise<Todo> {
  return withErrorHandling(async () => {
    const response = await axios.post<Todo>('/api/todos', data);
    return response.data;
  }, 'Failed to create todo');
}

// Get todos (paginated)
export async function getTodos(page: number, limit = 10): Promise<[Todo[], number]> {
  const offset = (page - 1) * limit;

  return withErrorHandling(async () => {
    const response = await axios.get<Todo[]>('/api/todos', {
      params: { offset, limit },
    });

    const value = response.headers['x-total-count'] as string;
    const total = typeof value === 'string' ? parseInt(value, 10) : 0;
    const pageCount = Math.ceil(total / limit);
    return [response.data, pageCount];
  }, 'Failed to get todos');
}

// Update a todo by ID
export async function updateTodo(id: string, data: UpdateTodoDto): Promise<Todo> {
  return withErrorHandling(async () => {
    const response = await axios.patch<Todo>(`/api/todos/${id}`, data);
    return response.data;
  }, 'Failed to update todo');
}

// Delete a todo by ID
export async function deleteTodo(id: string): Promise<void> {
  return withErrorHandling(async () => {
    await axios.delete(`/api/todos/${id}`);
  }, 'Failed to delete todo');
}
