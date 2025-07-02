import Box from '@mui/joy/Box';
import { useState } from 'react';
import TodoForm from '../../organisms/TodoForm/TodoForm';
import TodoList from '../../organisms/TodoList/TodoList';

const initialTodos = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Walk the dog', completed: true },
  { id: 3, text: 'Read a book', completed: false },
];

export default function TodoListPage() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (text: string) => {
    setTodos((prev) => [{ id: Date.now(), text, completed: false }, ...prev]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      // Move completed todos to the bottom
      return [
        ...updated.filter((t) => !t.completed),
        ...updated.filter((t) => t.completed),
      ];
    });
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 400, mt: 4 }}>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </Box>
  );
}
