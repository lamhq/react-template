import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, type Todo } from '../../api';
import { TODO_QUERY_KEY } from '../../constants';
import TodoCheckbox from './TodoCheckbox';

export type TodoCheckboxContainerProps = {
  todo: Todo;
};

export default function TodoCheckboxContainer({ todo }: TodoCheckboxContainerProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (checked: boolean) =>
      updateTodo(todo.id, {
        status: checked ? 'completed' : 'pending',
      }),
    onMutate: async (checked: boolean) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([TODO_QUERY_KEY]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [TODO_QUERY_KEY],
        (old: [Todo[], number] | undefined) => {
          if (!old) return old;
          const [todos, total] = old;
          return [
            todos.map((t) =>
              t.id === todo.id
                ? { ...t, status: checked ? 'completed' : 'pending' }
                : t,
            ),
            total,
          ];
        },
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData([TODO_QUERY_KEY], context.previousTodos);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  const handleCheck = (checked: boolean) => {
    mutate(checked);
  };

  return <TodoCheckbox todo={todo} onCheck={handleCheck} isPending={isPending} />;
}
