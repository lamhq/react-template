import Box from '@mui/joy/Box';
import { ErrorBoundary } from '../../../error';
import TodoForm from '../../organisms/TodoForm/TodoForm';
import TodoList from '../../organisms/TodoList';

export default function TodoListPage() {
  return (
    <Box
      sx={{ maxWidth: 400, mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <TodoForm />

      <ErrorBoundary>
        <TodoList />
      </ErrorBoundary>
    </Box>
  );
}
