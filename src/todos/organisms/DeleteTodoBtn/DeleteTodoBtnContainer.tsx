import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '../../../confirm';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';
import { TODO_QUERY_KEY } from '../../constants';
import DeleteTodoBtn from './DeleteTodoBtn';

export type DeleteTodoBtnContainerProps = {
  todo: Todo;
};

export default function DeleteTodoBtnContainer({
  todo,
}: DeleteTodoBtnContainerProps) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();
  const confirm = useConfirm();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
      showSuccess('Todo deleted!');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Todo',
      content: `Are you sure you want to delete "${todo.title}"?`,
      confirmationText: 'Delete',
      cancellationText: 'Cancel',
      confirmationButtonProps: { color: 'danger' },
    });

    if (confirmed) {
      mutate();
    }
  };

  return <DeleteTodoBtn onDelete={handleDelete} isPending={isPending} />;
}
