import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';
import DeleteTodoBtn from './DeleteTodoBtn';

export type DeleteTodoBtnContainerProps = {
  todo: Todo;
};

export default function DeleteTodoBtnContainer({
  todo,
}: DeleteTodoBtnContainerProps) {
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

  return <DeleteTodoBtn onDelete={handleDelete} isPending={isPending} />;
}
