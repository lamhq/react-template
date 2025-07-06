import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router';

import { HOME_ROUTE } from '../../routes';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(HOME_ROUTE);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography level="h1" component="h1" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography level="h4" component="h2" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography level="body-md" color="neutral" sx={{ mb: 3 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="solid" size="lg" onClick={handleGoHome} sx={{ mt: 2 }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
