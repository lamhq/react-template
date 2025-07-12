import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';

export function useDeleteTodoLogic(todo: Todo) {
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
  const handleDelete = () => mutate();

  return { handleDelete, isPending };
}
