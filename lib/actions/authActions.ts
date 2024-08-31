import { signOut } from '@/auth';

export const action = async () => {
	'use server';

	await signOut();
};
