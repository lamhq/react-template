import Checkbox from '@mui/joy/Checkbox';
import { type Todo } from '../../api';
import { useTodoCheckLogic } from './useTodoCheckLogic';

export default function TodoCheckbox({ todo }: { todo: Todo }) {
  const { handleCheck, isPending } = useTodoCheckLogic(todo);

  return (
    <Checkbox
      checked={todo.status === 'completed'}
      onChange={(e) => handleCheck(e.target.checked)}
      disabled={isPending}
      sx={{ mr: 1 }}
    />
  );
}
