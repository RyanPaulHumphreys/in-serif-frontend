'use client';

import { AppShell, Burger, Flex, Grid, Space, Button, em, Text, ActionIcon, Group } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { MdArrowBack } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LogoText } from '../Branding';
import { useAuthElement } from '@/lib/session';
import { getNavLinks } from '@/lib/navigation';

export var IsMobile : boolean | undefined;

export const AppShellContext = createContext<{isMobile: boolean, navbarOpened: boolean}>({isMobile: false, navbarOpened: false});

export default function MainAppShell({ children } : { children : any }) {
	const { status, data: session } = useSession();
	const router = useRouter();
	const [opened, { toggle, open, close }] = useDisclosure(true);
	const mobileQuery = useMediaQuery('(max-width: 56.50em)', false);
	const [isMobile, setIsMobile = (isMobile : boolean | undefined) =>{
		IsMobile = isMobile ?? false;

	}] = useState<boolean>();
	const moveUserButton = useMediaQuery('(max-width: 74em)');

	const pathname = usePathname();
	const links = getNavLinks(pathname);
	const [authElement, setAuthElement] = useState<React.JSX.Element | null>(null);
	useEffect(() => {
		console.log('Session status: ', status);
		const _authElement = useAuthElement(session);
		setAuthElement(_authElement);
	}, [status]);

	useEffect(() => {
		setIsMobile(mobileQuery);
	}, [mobileQuery]);

	useEffect(() => {
		if (isMobile) close();
		else open();
	}, [isMobile]);
	return (
		<AppShell aside={{ width: 0, breakpoint: 'sm', collapsed: { mobile: true, desktop: true } }} header={{ height: {base: 60, sm: 75} }} navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}>
			<AppShell.Header>	
				<Grid columns={4} grow align="end">
					<Grid.Col span={{base: 2, md: 1}}>
						<Flex align="center" justify="space-between" gap={10} p={10}>
							<Group>
								<Burger opened={opened} onClick={toggle} />
								<LogoText size="xxl" includeCursor={false} />
							</Group>

							{isMobile ? 
							<ActionIcon variant="subtle" color="black" onClick={() => router.back()}><MdArrowBack size={32} /></ActionIcon>
							:
							<Button leftSection={<MdArrowBack size={20} />} size="md" color="black" variant="subtle" onClick={() => router.back()}>
                            	Go Back
							</Button> }
						
						</Flex>
					</Grid.Col>
					{(() => {
						if (!moveUserButton) {
							return (
								<Grid.Col span={1} offset={1}>
									<Flex justify="flex-end" p={10}>
										{authElement}
									</Flex>
								</Grid.Col>
							);
						}
					})()}
				</Grid>
			</AppShell.Header>
			<AppShell.Navbar>
				<div style={{ height: '90%' }}>
					{links}
				</div>
				{(() => {
					if (moveUserButton) {
						return (
							<Flex align="center" justify="center">
								{authElement}
							</Flex>
						);
					}
				})()}
			</AppShell.Navbar>
			<AppShell.Main>
				<AppShellContext.Provider value={{isMobile: isMobile ?? false, navbarOpened: opened}}>
				{children}
				</AppShellContext.Provider>
			</AppShell.Main>
		</AppShell>
	);
}
