import { Container, Grid, GridCol, Loader, Overlay, Skeleton } from '@mantine/core';

const child = <Skeleton height={140} radius="md" animate={false} bg="blue" />;

export default function Loading() {
	return (
		<Container>
			<Loader color="black" />
		</Container>
	);
}
