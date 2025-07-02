import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
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
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
            sx={{ mr: 1 }}
          />
          <Typography
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1,
              color: todo.completed ? 'text.tertiary' : undefined,
            }}
          >
            {todo.text}
          </Typography>
          <IconButton color="danger" onClick={() => onDeleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
