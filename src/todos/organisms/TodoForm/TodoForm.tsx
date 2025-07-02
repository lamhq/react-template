import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNotification } from '../../../notification';
import { createTodo } from '../../api';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { mutate: addTodo, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showSuccess('Todo added!');
      setTitle('');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({ title: title.trim(), status: 'pending' });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        fullWidth
      />
      <Button type="submit" variant="solid" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add'}
      </Button>
    </Box>
  );
}
