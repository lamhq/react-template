import CircularProgress from '@mui/joy/CircularProgress';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import type { NavLinkRenderProps } from 'react-router';
import { NavLink } from 'react-router';

export type NavListItemButtonProps = {
  label: string;
  onClick?: () => void;
  icon: React.ComponentType;
  to: string;
  className?: string;
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
