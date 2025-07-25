import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useConfirm } from '../../../confirm';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';
import { todoListPageAtom } from '../../atoms';
import { TODO_QUERY_KEY } from '../../constants';
import DeleteTodoBtn from './DeleteTodoBtn';

export type DeleteTodoBtnContainerProps = {
  todo: Todo;
};

export default function DeleteTodoBtnContainer({
  todo,
}: DeleteTodoBtnContainerProps) {
  const queryClient = useQueryClient();
  const page = useAtomValue(todoListPageAtom);
  const { showError } = useNotification();
  const confirm = useConfirm();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY, page] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([TODO_QUERY_KEY, page]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [TODO_QUERY_KEY, page],
        (old: [Todo[], number] | undefined) => {
          if (!old) return old;
          const [todos, total] = old;
          return [todos.filter((t) => t.id !== todo.id), total - 1];
        },
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err: Error, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData([TODO_QUERY_KEY, page], context.previousTodos);
      }
      showError(err.message);
    },
    // onSettled: () => {
    //   // Always refetch after error or success to ensure cache consistency
    //   queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY, page] });
    // },
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

  return (
    <DeleteTodoBtn
      onDelete={() => {
        void handleDelete();
      }}
      isPending={isPending}
    />
  );
}
