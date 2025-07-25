import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNotification } from '../../../notification';
import { createTodo, type Todo } from '../../api';
import { todoListPageAtom } from '../../atoms';
import { TODO_QUERY_KEY } from '../../constants';
import TodoFormView from '../../molecules/TodoForm';

export default function AddTodoForm() {
  const queryClient = useQueryClient();
  const page = useAtomValue(todoListPageAtom);
  const { showError } = useNotification();
  const { mutate: addTodo } = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo: {
      title: string;
      status?: 'pending' | 'in_progress' | 'completed';
    }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY, page] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([TODO_QUERY_KEY, page]);

      // Create a temporary todo for optimistic update
      const tempTodo: Todo = {
        id: `temp-${Date.now()}`,
        title: newTodo.title,
        status: newTodo.status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Optimistically update to the new value
      queryClient.setQueryData(
        [TODO_QUERY_KEY, page],
        (old: [Todo[], number] | undefined) => {
          if (!old) return old;
          const [todos, total] = old;
          return [
            [tempTodo, ...todos], // Add to the beginning of the list
            total + 1,
          ];
        },
      );

      // Return a context object with the snapshotted value and temp todo
      return { previousTodos, tempTodo };
    },
    onSuccess: (newTodo: Todo, _, context) => {
      // Update the tempTodo with the actual todo returned from the server
      if (context?.tempTodo) {
        queryClient.setQueryData(
          [TODO_QUERY_KEY, page],
          (old: [Todo[], number] | undefined) => {
            if (!old) return old;
            const [todos, total] = old;
            return [
              todos.map((todo) =>
                todo.id === context.tempTodo.id ? newTodo : todo,
              ),
              total,
            ];
          },
        );
      }
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
  const handleSubmit = (data: { title: string }) => {
    if (data.title.trim()) {
      addTodo({ title: data.title.trim(), status: 'pending' });
    }
  };

  return <TodoFormView onSubmit={handleSubmit} />;
}
