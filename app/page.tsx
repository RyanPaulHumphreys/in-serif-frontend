import { Center, Container, Grid, GridCol, Skeleton, Space } from '@mantine/core';
import { LogoText } from '@/components/Branding';

const child = <Skeleton height={140} radius="md" animate={false} bg="blue" />;

export default function HomePage() {
	return (
		<>
			<Center>
				{/* <Text size="massive" ff="text" ta="center">your thoughts, </Text> */}
				{/* <LogoTextWithAnimation/> */}
				<Space w="md" />
				<LogoText size="massive" includeCursor cursorSize={72} />
			</Center>
			<Container my="md">
				<Grid>
					<GridCol span={3}>
						{child}
					</GridCol>
					<GridCol span={2}>
						{child}
					</GridCol>
					<GridCol span={7}>
						{child}
					</GridCol>
					<GridCol span={4}>
						{child}
					</GridCol>
					<GridCol span={5}>
						{child}
					</GridCol>
					<GridCol span={3}>
						{child}
					</GridCol>
					<GridCol span={6}>
						{child}
					</GridCol>
					<GridCol span={6}>
						{child}
					</GridCol>
				</Grid>
			</Container>
		</>
	);
}
