import LayoutContainer from '@components/layout-container';
import Hero from '@components/hero';
import { NextSeo } from 'next-seo';

const Home = () => {
	return (
		<>
			<NextSeo
				title="Cambridge Community Kitchen"
				description="News and statements from Cambridge Community Kitchen"
				openGraph={{
					title: 'Cambridge Community Kitchen',
					description:
						'We are a food solidarity collective tackling food poverty in Cambridge',
					url: 'https://cckitchen.uk',
				}}
			/>
			<LayoutContainer>
				<Hero />
			</LayoutContainer>
		</>
	);
};

export default Home;
