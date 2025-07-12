import { type PaginationProps } from '../../../common/molecules/Pagination';
import { type Todo } from '../../api';

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import Pagination from '../../../common/molecules/Pagination';
import DeleteTodoBtn from '../DeleteTodoBtn';
import TodoCheckbox from '../TodoCheckbox';

export type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  pageCount: number;
  onPageChange: PaginationProps['onChange'];
};

export default function TodoList({
  todos,
  isLoading,
  isFetching,
  page,
  pageCount,
  onPageChange,
}: TodoListProps) {
  if (isLoading) return <LoadingFallback />;

  return (
    <Box
      sx={
        isFetching
          ? { filter: 'blur(1.5px)', transition: 'filter 0.3s' }
          : { transition: 'filter 0.3s' }
      }
    >
      {todos.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
          }}
        >
          <Typography level="body-md" color="neutral">
            No todos found. Create your first todo to get started!
          </Typography>
        </Box>
      ) : (
        <>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <TodoCheckbox todo={todo} />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      textDecoration:
                        todo.status === 'completed' ? 'line-through' : 'none',
                      color:
                        todo.status === 'completed' ? 'text.tertiary' : undefined,
                    }}
                  >
                    {todo.title}
                  </Typography>
                </Box>
                <DeleteTodoBtn todo={todo} />
              </ListItem>
            ))}
          </List>

          {pageCount > 1 && (
            <Pagination count={pageCount} page={page} onChange={onPageChange} />
          )}
        </>
      )}
    </Box>
  );
}
