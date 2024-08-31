import { MdHome } from 'react-icons/md';
import { IoLibrary } from 'react-icons/io5';
import { NavLink } from '@mantine/core';
import { GetRootPath } from '@/utils/navigation';

const data = [
  {
    icon: MdHome, label: 'Home', href: '/',
  },
  {
    icon: IoLibrary, label: 'Explore', href: '/feed',
  },
];

export const getNavLinks = (pathname: string) => data.map(linkData => {
    const active: boolean = GetRootPath(pathname) === linkData.href;
    return (
      <NavLink
        color="black"
        key={linkData.label}
        active={active}
        label={linkData.label}
        leftSection={<linkData.icon size="1rem" />}
        href={linkData.href}
        variant="filled"
        styles={{ label: { fontSize: 20 } }}
      />
    );
  });
