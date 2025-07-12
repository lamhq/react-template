import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, type Todo } from '../../api';
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCheck = (checked: boolean) => {
    mutate(checked);
  };

  return <TodoCheckbox todo={todo} onCheck={handleCheck} isPending={isPending} />;
}
