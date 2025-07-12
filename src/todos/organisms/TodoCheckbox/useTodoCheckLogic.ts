import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, type Todo } from '../../api';

export function useTodoCheckLogic(todo: Todo) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (checked: boolean) =>
      updateTodo(todo.id, {
        status: checked ? 'completed' : 'pending',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCheck = (checked: boolean) => {
    mutate(checked);
  };

  return {
    handleCheck,
    isPending,
  };
}
