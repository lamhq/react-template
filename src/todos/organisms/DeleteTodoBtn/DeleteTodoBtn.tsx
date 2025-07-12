import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import { type Todo } from '../../api';
import { useDeleteTodoLogic } from './useDeleteTodoLogic';

export type DeleteTodoBtnProps = {
  todo: Todo;
  size?: 'sm' | 'md' | 'lg';
};

export default function DeleteTodoBtn({ todo, size = 'sm' }: DeleteTodoBtnProps) {
  const { handleDelete, isPending } = useDeleteTodoLogic(todo);

  return (
    <IconButton
      color="danger"
      size={size}
      onClick={handleDelete}
      disabled={isPending}
      title="Delete todo"
    >
      <DeleteIcon />
    </IconButton>
  );
}
