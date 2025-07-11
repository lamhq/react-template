import Box from '@mui/joy/Box';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingFallback from '../../../common/molecules/LoadingFallback';
import Pagination, {
  type PaginationProps,
} from '../../../common/molecules/Pagination';
import { getTodos, type Todo } from '../../api';
import TodoListView from '../../molecules/TodoList/TodoList';

export default function TodoList() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery<{
    items: Todo[];
    totalPages: number;
  }>({
    queryKey: ['todos', page],
    queryFn: async () => {
      const [items, total] = await getTodos(page, limit);
      setPageCount(total);
      return { items, totalPages: total };
    },
    staleTime: 1000,
    retry: false,
    throwOnError: true,
    networkMode: 'always',
  });

  const handlePageChange: PaginationProps['onChange'] = (_, value: number) => {
    setPage(value);
  };

  if (isLoading) return <LoadingFallback />;

  return (
    <Box
      sx={
        isFetching
          ? { filter: 'blur(1.5px)', transition: 'filter 0.3s' }
          : { transition: 'filter 0.3s' }
      }
    >
      <TodoListView todos={data?.items || []} />

      {pageCount > 1 && (
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      )}
    </Box>
  );
}
