import Checkbox from '@mui/joy/Checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, type Todo } from '../../api';

export default function TodoCheckbox({ todo }: { todo: Todo }) {
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

  return (
    <Checkbox
      checked={todo.status === 'completed'}
      onChange={(e) => mutate(e.target.checked)}
      disabled={isPending}
      sx={{ mr: 1 }}
    />
  );
}
