import '@mantine/tiptap/styles.css';
import FeedAside from '@/components/AsideBars/FeedAside';

export const metadata = {
	title: 'InSerif',
	description: 'Your thoughts, in serif',
};

export default function FeedLayout({ children }: { children: any }) {
	return (
		<div>
			<FeedAside />
			{children}
		</div>
	);
}
