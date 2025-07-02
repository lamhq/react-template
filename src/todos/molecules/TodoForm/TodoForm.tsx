import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { Controller, useForm } from 'react-hook-form';

type TodoFormData = {
  title: string;
};

type TodoFormProps = {
  onSubmit: (data: TodoFormData) => void;
  isPending: boolean;
};

export default function TodoForm({ onSubmit, isPending }: TodoFormProps) {
  const { control, handleSubmit, reset } = useForm<TodoFormData>({
    defaultValues: { title: '' },
  });

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data);
    reset(); // auto-clear after submit
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        mb: 2,
        alignItems: 'center',
      }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Title" fullWidth />}
      />
      <Button
        type="submit"
        variant="solid"
        disabled={isPending}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {isPending ? 'Adding...' : 'Add'}
      </Button>
    </Box>
  );
}
