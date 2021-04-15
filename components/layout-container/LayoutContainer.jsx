import { Box } from '@chakra-ui/react';

import Nav from '@components/nav';
import Footer from '@components/footer';

const LayoutContainer = ({ children }) => {
	return (
		<div>
			<Nav />
			<Box mt="1rem" minHeight="calc(100vh - 140px)">
				{children}
			</Box>
			<Footer />
		</div>
	);
};

export default LayoutContainer;
