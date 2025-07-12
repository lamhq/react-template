import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import IconButton from '@mui/joy/IconButton';

import { useSignOut } from '../../auth-state';
import { closeSidebar } from './utils';

export default function SignOutButton() {
  const signOut = useSignOut();
  const handleSignOut = () => {
    closeSidebar();
    signOut();
  };

  return (
    <IconButton
      size="sm"
      variant="plain"
      color="neutral"
      onClick={handleSignOut}
      title="Sign out"
    >
      <LogoutRoundedIcon />
    </IconButton>
  );
}
