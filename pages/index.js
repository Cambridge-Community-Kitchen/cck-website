import { useMemo } from 'react';

import LayoutContainer from '@components/layout-container';
import Hero from '@components/hero';

export default function Home() {
	const browserLanguage = useMemo(
		() => window.navigator.language.split('-')[0],
	);

	return (
		<LayoutContainer>
			<Hero />
		</LayoutContainer>
	);
}
