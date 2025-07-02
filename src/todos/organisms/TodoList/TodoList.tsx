import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination, {
  type PaginationProps,
} from '../../../common/molecules/Pagination';
import { getTodos, type Todo } from '../../api';
import TodoListView from '../../molecules/TodoList/TodoList';

export default function TodoList() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery<
    { items: Todo[]; totalPages: number },
    Error
  >({
    queryKey: ['todos', page],
    queryFn: async () => {
      const [items, total] = await getTodos(page, limit);
      setPageCount(total);
      return { items, totalPages: total };
    },
    refetchInterval: 3000,
  });

  const handlePageChange: PaginationProps['onChange'] = (_, value: number) => {
    setPage(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <TodoListView todos={data?.items || []} />

      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          sx={{ justifyContent: 'center' }}
        />
      )}
    </>
  );
}
