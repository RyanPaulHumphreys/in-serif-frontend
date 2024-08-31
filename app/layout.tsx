import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import MainAppShell from '@/components/MainAppShell/MainAppShell';
import { SessionWrapper } from '@/components/Auth/SessionWrapper';

export const metadata = {
	title: 'InSerif',
	description: 'Your thoughts, in serif',
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<SessionWrapper>
			<html lang="en">
				<head>
					<ColorSchemeScript />
					<link rel="shortcut icon" href="/favicon.svg" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
					/>
				</head>
				<body>
					<MantineProvider theme={theme}>
						<Notifications position="top-right" />
						<MainAppShell>
							{children}
						</MainAppShell>
					</MantineProvider>
				</body>
			</html>
		</SessionWrapper>
	);
}
