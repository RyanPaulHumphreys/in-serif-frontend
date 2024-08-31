'use client';

import { createTheme, rem } from '@mantine/core';
import { Merriweather, Roboto_Slab, Domine } from 'next/font/google';

const logoFont = Merriweather({ weight: '700', subsets: [], display: 'swap' });
const mainFont = Roboto_Slab({ weight: '400', subsets: [], display: 'swap' });
const headingFont = Domine({ weight: '400', subsets: [], display: 'swap' });
export const theme = createTheme({
	fontFamily: mainFont.style.fontFamily,
	/* Put your mantine theme override here */
	headings: {
		fontFamily: headingFont.style.fontFamily,

	},

	other:
  	{
  		brandingFontFamily: logoFont.style.fontFamily,
  	},
	fontSizes: {
		xs: rem(10),
		sm: rem(11),
		md: rem(14),
		lg: rem(16),
		xl: rem(20),
		xxl: rem(30),
		massive: rem(80),
		huge: rem(160),
	},
	primaryColor: 'stoney-blue',
	colors: {
		'stoney-blue': [
			'#f3f3fe',
			'#e4e6ed',
			'#c8cad3',
			'#a9adb9',
			'#9093a4',
			'#808496',
			'#767c91',
			'#656a7e',
			'#585e72',
			'#4a5167',
		],
	},
});
