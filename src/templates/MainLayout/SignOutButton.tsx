import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import IconButton from '@mui/joy/IconButton';
import { useSignOut } from '../../auth-state/hooks';

export default function SignOutButton() {
  const signOut = useSignOut();
  return (
    <IconButton
      size="sm"
      variant="plain"
      color="neutral"
      onClick={signOut}
      title="Sign out"
    >
      <LogoutRoundedIcon />
    </IconButton>
  );
}
