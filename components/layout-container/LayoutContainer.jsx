import { Box, SlideFade, useBreakpointValue } from '@chakra-ui/react';

import Nav from '@components/nav';
import Footer from '@components/footer';
import styles from './LayoutContainer.module.scss';

const LayoutContainer = ({ children }) => {
	return (
		<>
			<Nav />
			<SlideFade in>
				<Box
					className={styles.root}
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
		</>
	);
};

export default LayoutContainer;
