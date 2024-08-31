import Google from 'next-auth/providers/google';

export default {
	providers: [Google({
		clientSecret: process.env.GOOGLE_SECRET,
		clientId: process.env.GOOGLE_ID,
	})],
	pages: {
		signIn: '/login',
		signOut: '/signout',
	},
};
