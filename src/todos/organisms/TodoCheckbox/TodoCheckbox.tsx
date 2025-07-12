import Checkbox from '@mui/joy/Checkbox';
import { type Todo } from '../../api';

export type TodoCheckboxProps = {
  todo: Todo;
  onCheck: (checked: boolean) => void;
  isPending: boolean;
};

export default function TodoCheckbox({
  todo,
  onCheck,
  isPending,
}: TodoCheckboxProps) {
  return (
    <Checkbox
      checked={todo.status === 'completed'}
      onChange={(e) => onCheck(e.target.checked)}
      disabled={isPending}
      sx={{ mr: 1 }}
    />
  );
}
