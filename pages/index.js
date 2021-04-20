import Head from 'next/head';
import LayoutContainer from '@components/layout-container';
import Hero from '@components/hero';

const Home = () => {
	return (
		<>
			<Head>
				<title>Cambridge Community Kitchen</title>
				<meta property="og:title" content="Cambridge Community Kitchen" />
				<meta property="og:url" content="https://cckitchen.uk" />
			</Head>
			<LayoutContainer>
				<Hero />
			</LayoutContainer>
		</>
	);
};

export default Home;
