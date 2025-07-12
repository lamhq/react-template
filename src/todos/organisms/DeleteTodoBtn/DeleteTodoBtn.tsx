import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';

export type DeleteTodoBtnProps = {
  size?: 'sm' | 'md' | 'lg';
  onDelete: () => void;
  isPending: boolean;
};

export default function DeleteTodoBtn({
  size = 'sm',
  onDelete,
  isPending,
}: DeleteTodoBtnProps) {
  return (
    <IconButton
      color="danger"
      size={size}
      onClick={onDelete}
      disabled={isPending}
      title="Delete todo"
    >
      <DeleteIcon />
    </IconButton>
  );
}
