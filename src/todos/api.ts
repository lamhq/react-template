import axios from 'axios';

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
  const response = await axios.post<Todo>('/api/todos', data);
  return response.data;
}

// Get all todos
export async function getTodos(): Promise<Todo[]> {
  const response = await axios.get<Todo[]>('/api/todos');
  return response.data;
}

// Update a todo by ID
export async function updateTodo(id: string, data: UpdateTodoDto): Promise<Todo> {
  const response = await axios.patch<Todo>(`/api/todos/${id}`, data);
  return response.data;
}

// Delete a todo by ID
export async function deleteTodo(id: string): Promise<void> {
  await axios.delete(`/api/todos/${id}`);
}
