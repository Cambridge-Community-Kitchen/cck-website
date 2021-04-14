import '../styles/globals.css';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		orange: {
			light: '#fedead',
			lightHover: '#f2e3cb',
			dark: '#fe9123',
			darkHover: '#eb9138',
		},
	},
});

function SafeHydrate({ children }) {
	// This prevents the app from rendering on the server
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : children}
		</div>
	);
}

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Cambridge Community Kitchen</title>
				<meta property="og:title" content="Cambridge Community Kitchen" />
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
				/>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<SafeHydrate>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</SafeHydrate>
		</>
	);
}

export default App;
