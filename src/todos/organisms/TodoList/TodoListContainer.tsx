import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { type PaginationProps } from '../../../common/molecules/Pagination';
import { getTodos, type Todo } from '../../api';
import { todoListPageAtom } from '../../atoms';
import { TODO_QUERY_KEY } from '../../constants';
import TodoList from './TodoList';

export default function TodoListContainer() {
  const [page, setPage] = useAtom(todoListPageAtom);
  const [pageCount, setPageCount] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery<[Todo[], number]>({
    queryKey: [TODO_QUERY_KEY, page],
    queryFn: async () => {
      const [items, total] = await getTodos(page, limit);
      setPageCount(total);
      return [items, total];
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
      todos={data?.[0] || []}
      isLoading={isLoading}
      isFetching={isFetching}
      page={page}
      pageCount={pageCount}
      onPageChange={handlePageChange}
    />
  );
}
