import { Roboto, Quicksand } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, cyan } from '@mui/material/colors';

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
const colorSchemes = createTheme({
	palette: {
		primary: {
			light: '#333333',
			main: '#111111',
			dark: '#080808',
		},

		// secondary: {
		// 	light: cyan.A200,
		// 	main: cyan.A400,
		// 	dark: cyan.A700,
		// },

		secondary: {
			light: cyan[600],
			main: cyan[700],
			dark: cyan[800],
		},

		error: {
			main: red.A400,
		},
	},
});

const defaultTheme = createTheme({
	...colorSchemes,
	typography: {
		fontFamily: quicksand.style.fontFamily,
	},
	components: {
		MuiMenu: {
			styleOverrides: {
				paper: {
					backgroundColor: colorSchemes.palette.primary.dark,
					// border: `1px solid ${colorSchemes.palette.secondary.dark}`
				}
			}
		}
	}
});

export default defaultTheme;