import '../styles/globals.css';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: () => ({
			h2: {
				fontSize: 28,
				fontWeight: 700,
			},
			h3: {
				fontSize: 24,
			},
			h4: {
				fontSize: 22,
			},
			h5: {
				fontSize: 20,
				fontWeight: 700,
			},
			h6: {
				fontSize: 18,
				fontWeight: 700,
			},
		}),
	},
	colors: {
		orange: {
			light: '#fedead',
			lightHover: '#f2e3cb',
			dark: '#fe9123',
			darkHover: '#eb9138',
		},
	},
});

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
				<meta
					property="article:publisher"
					content="https://www.facebook.com/cambridgecommunitykitchen"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="me" href="https://mastodon.social/@cckitchen" />
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
