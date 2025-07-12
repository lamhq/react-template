import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { type PaginationProps } from '../../../common/molecules/Pagination';
import { getTodos, type Todo } from '../../api';
import { TODO_QUERY_KEY } from '../../constants';
import TodoList from './TodoList';

export default function TodoListContainer() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery<{
    items: Todo[];
    totalPages: number;
  }>({
    queryKey: [TODO_QUERY_KEY, page],
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

  return (
    <TodoList
      todos={data?.items || []}
      isLoading={isLoading}
      isFetching={isFetching}
      page={page}
      pageCount={pageCount}
      onPageChange={handlePageChange}
    />
  );
}
