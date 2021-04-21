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

// function SafeHydrate({ children }) {
// 	// This prevents the app from rendering on the server
// 	return (
// 		<div suppressHydrationWarning>
// 			{typeof window === 'undefined' ? null : children}
// 		</div>
// 	);
// }

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
				/>
				<meta property="og:site_name" content="Cambridge Community Kitchen" />
				<meta property="fb:pages" content="113945517195261" />
				<meta name="twitter:url" content="https://cckitchen.uk" />
				<meta name="twitter:site" content="@camcommunity" />
				<meta
					property="article:publisher"
					content="https://www.facebook.com/cambridgecommunitykitchen"
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:type" content="website" />
				<meta
					name="keywords"
					content="Community kitchen, Cambridge, community, equality, food solidarity"
				/>
				{/* <meta name="theme-color" content="#2b8186" /> */}
			</Head>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

export default App;
