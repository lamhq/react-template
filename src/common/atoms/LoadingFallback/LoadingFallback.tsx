import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function LoadingFallback() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={200}
      data-testid="loading-fallback-container"
    >
      <CircularProgress />
    </Box>
  );
}
