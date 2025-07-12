import type { NavLinkRenderProps } from 'react-router';

import CircularProgress from '@mui/joy/CircularProgress';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import { NavLink } from 'react-router';

export type NavListItemButtonProps = {
  to: string;
  label: string;
  icon: React.ComponentType;
  className?: string;
  onClick?: () => void;
};

export default function NavListItemButton({
  label,
  onClick,
  icon: Icon,
  to,
  className,
}: NavListItemButtonProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        (className ?? '') + (isActive ? ' Mui-selected' : '')
      }
    >
      {({ isPending }: NavLinkRenderProps) => {
        return (
          <>
            <Icon />
            <ListItemContent>
              <Typography level="title-sm">{label}</Typography>
            </ListItemContent>
            {isPending && <CircularProgress size="sm" />}
          </>
        );
      }}
    </NavLink>
  );
}
