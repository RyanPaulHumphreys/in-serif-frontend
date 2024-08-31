'use client';

import { AppShellAside, NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { GiQuillInk } from 'react-icons/gi';
import { MdFeed } from 'react-icons/md';

const data = [
	{
		icon: MdFeed, label: 'Explore', href: '/feed',
	},
	{
		icon: GiQuillInk, label: 'Write', href: '/feed/create',
	},
];

export default function FeedAside() {
	const pathname = usePathname();
	const links = data.map(linkData => <NavLink color="black" key={linkData.label} active={pathname === linkData.href} label={linkData.label} leftSection={<linkData.icon size="1rem" />} href={linkData.href} variant="filled" styles={{ label: { fontSize: 16 } }}></NavLink>);

	return (
		<AppShellAside>
			{links}
		</AppShellAside>
	);
}
