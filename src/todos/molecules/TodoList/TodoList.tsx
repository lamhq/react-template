import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import type { Todo } from '../../api';
import DeleteTodoBtn from '../../organisms/DeleteTodoBtn';
import TodoCheckbox from '../../organisms/TodoCheckbox';

export type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <TodoCheckbox todo={todo} />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                textDecoration:
                  todo.status === 'completed' ? 'line-through' : 'none',
                color: todo.status === 'completed' ? 'text.tertiary' : undefined,
              }}
            >
              {todo.title}
            </Typography>
          </Box>
          <DeleteTodoBtn todo={todo} />
        </ListItem>
      ))}
    </List>
  );
}
