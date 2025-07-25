import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { Controller, useForm } from 'react-hook-form';

type TodoFormData = {
  title: string;
};

type TodoFormProps = {
  onSubmit: (data: TodoFormData) => void;
};

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const { control, handleSubmit, reset, watch } = useForm<TodoFormData>({
    defaultValues: { title: '' },
  });

  const titleValue = watch('title');
  const isSubmitDisabled = !titleValue || titleValue.trim() === '';

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
        disabled={isSubmitDisabled}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add
      </Button>
    </Box>
  );
}
