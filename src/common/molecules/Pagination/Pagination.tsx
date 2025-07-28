import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';

export type PaginationProps = {
  count: number;
  page: number;
  onChange: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    page: number,
  ) => void;
};

export default function Pagination({ count, page, onChange }: PaginationProps) {
  const totalPages = Math.max(1, count);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages === 1) return null;

  return (
    <ButtonGroup
      spacing="0.5rem"
      size="sm"
      aria-label="pagination button group"
      sx={{ justifyContent: 'center' }}
    >
      <IconButton
        onClick={(e) => {
          onChange(e, page - 1);
        }}
        disabled={page <= 1}
        aria-label="Previous Page"
      >
        <ChevronLeftIcon />
      </IconButton>
      {pages.map((p) => (
        <Button
          key={p}
          onClick={(e) => {
            onChange(e, p);
          }}
          aria-current={p === page ? 'page' : undefined}
          variant={p === page ? 'solid' : 'outlined'}
          color={p === page ? 'primary' : 'neutral'}
          sx={{ fontWeight: p === page ? 'bold' : 'normal' }}
        >
          {p}
        </Button>
      ))}
      <IconButton
        onClick={(e) => {
          onChange(e, page + 1);
        }}
        disabled={page >= totalPages}
        aria-label="Next Page"
      >
        <ChevronRightIcon />
      </IconButton>
    </ButtonGroup>
  );
}
