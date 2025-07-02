import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../notification';
import { createTodo } from '../../api';
import TodoFormView from '../../molecules/TodoForm';

export default function TodoForm() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { mutate: addTodo, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showSuccess('Todo added!');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  const handleSubmit = (data: { title: string }) => {
    if (data.title.trim()) {
      addTodo({ title: data.title.trim(), status: 'pending' });
    }
  };

  return <TodoFormView onSubmit={handleSubmit} isPending={isPending} />;
}
