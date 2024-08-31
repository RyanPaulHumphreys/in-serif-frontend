import { Center, Loader, LoadingOverlay } from '@mantine/core';

export default function Loading() {
	return (<Center mt={50}><Loader color="black" size={60}/></Center>);
}
