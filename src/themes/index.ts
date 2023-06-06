import { Roboto, Quicksand } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, teal, deepOrange } from '@mui/material/colors';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const quicksand = Quicksand({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const defaultTheme = createTheme({
	palette: {
		primary: {
			light: '#333333',
			main: '#111111',
			dark: '#080808',
		},

		secondary: {
			light: teal.A200,
			main: teal.A400,
			dark: teal.A700,
		},

		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: quicksand.style.fontFamily,
	},
});

export default defaultTheme;