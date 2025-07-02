import { useQuery } from '@tanstack/react-query';
import { getTodos, type Todo } from '../../api';
import TodoListView from '../../molecules/TodoList/TodoList';

export default function TodoList() {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error?.message}</div>;

  return <TodoListView todos={todos} />;
}
