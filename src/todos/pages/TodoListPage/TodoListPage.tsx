import Box from '@mui/joy/Box';
import AddTodoForm from '../../organisms/AddTodoForm/AddTodoForm';
import TodoList from '../../organisms/TodoList';

export default function TodoListPage() {
  return (
    <Box
      sx={{ maxWidth: 400, mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <AddTodoForm />
      <TodoList />
    </Box>
  );
}
