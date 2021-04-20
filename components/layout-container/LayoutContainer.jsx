import { Box, SlideFade, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';

import Nav from '@components/nav';
import Footer from '@components/footer';

const LayoutContainer = ({ children, title }) => {
	return (
		<div>
			<Head>
				{/* <title>{title}</title> */}
				{/* <meta property="og:title" content={title} /> */}
				<meta
					property="og:description"
					name="og:description"
					content="Test description"
				/>
			</Head>
			<Nav />
			<SlideFade in>
				<Box
					mt="1rem"
					minHeight={useBreakpointValue({
						base: 'calc(100vh - 186px)',
						lg: 'calc(100vh - 140px)',
					})}
				>
					{children}
				</Box>
			</SlideFade>
			<Footer />
		</div>
	);
};

export default LayoutContainer;
