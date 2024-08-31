'use client';

import { MdOutlineWbSunny } from 'react-icons/md';
import { HiOutlineMoon } from 'react-icons/hi2';

import { Button, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
      <Button color="stoney-blue" onClick={() => toggleColorScheme()}>
        {colorScheme === 'light' ? <HiOutlineMoon size={20} /> : <MdOutlineWbSunny size={20} />}
      </Button>
  );
}
