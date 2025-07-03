import type { FallbackProps } from 'react-error-boundary';

import BlockIcon from '@mui/icons-material/Block';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { isApiError } from '../utils';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const iconStyle = { fontSize: '5rem' };
  let message = 'An error occurred in the app.';
  let icon = <WarningIcon style={iconStyle} />;

  if (isApiError(error)) {
    // default: network error
    let status = 0;

    if (error.response) {
      status = error.response.status;
    }

    switch (status) {
      case 0:
        message = 'Please check your network connection.';
        icon = <CloudOffIcon style={iconStyle} />;
        break;

      case 404:
        message = 'Resource not found.';
        icon = <SearchIcon style={iconStyle} />;
        break;

      case 403:
        message = "You're not allowed to access this section.";
        icon = <BlockIcon style={iconStyle} />;
        break;

      case 500:
        message = 'Our server has an error. Please try again later.';
        break;

      default:
        break;
    }
  }

  return (
    <Stack role="alert" spacing={1} direction="column" sx={{ alignItems: 'center' }}>
      <Typography level="body-md">{icon}</Typography>
      <Typography level="body-md">{message}</Typography>
      <Button color="primary" variant="solid" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Stack>
  );
}
