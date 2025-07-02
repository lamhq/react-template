import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { useState } from 'react';

type TodoFormProps = {
  onAddTodo: (text: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTodo(value.trim());
      setValue('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 1, mb: 2 }}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo"
        fullWidth
      />
      <Button type="submit" variant="solid">
        Add
      </Button>
    </Box>
  );
}
