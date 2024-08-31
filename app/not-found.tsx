import { Container, Flex, Text } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
	return (
		<Container>
			<Flex align="center">
				<Container mr={0}>
					<Text size="huge" ff="heading">404</Text>
				</Container>
				<Container ml={0}>
					<Text ff="heading" size="xxl">Not Found</Text>
					<p>Could not find requested resource</p>
					<Link href="/">Return Home</Link>
				</Container>
			</Flex>
		</Container>
	);
}
