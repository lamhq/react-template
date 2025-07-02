import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';

export type DeleteTodoBtnProps = {
  todo: Todo;
  size?: 'sm' | 'md' | 'lg';
};

export default function DeleteTodoBtn({ todo, size = 'sm' }: DeleteTodoBtnProps) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showSuccess('Todo deleted!');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  return (
    <IconButton
      color="danger"
      size={size}
      onClick={() => mutate()}
      disabled={isPending}
      title="Delete todo"
    >
      <DeleteIcon />
    </IconButton>
  );
}
