import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import authConfig from './auth.config';
import { signOut } from './auth';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async (req: NextRequest) => {
	const authInfo = (req as any).auth;
	if (authInfo?.expires) {
		if (Date.now() > Date.parse(authInfo.expires)) {
			console.log('Token has expired. Signing out...');
			await signOut();
		}
		//console.log(`Token expires on ${new Date(Date.parse(authInfo.expires)).toISOString()}`);
	} else {
		console.log('Could not get token');
	}
});
