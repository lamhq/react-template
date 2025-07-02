import Box from '@mui/joy/Box';
import TodoForm from '../../organisms/TodoForm/TodoForm';
import TodoList from '../../organisms/TodoList';

export default function TodoListPage() {
  return (
    <Box sx={{ maxWidth: 400, mt: 4 }}>
      <TodoForm />
      <TodoList />
    </Box>
  );
}
