import Head from 'next/head';
import LayoutContainer from '@components/layout-container';
import Hero from '@components/hero';

const Home = () => {
	return (
		<>
			<Head>
				<meta property="og:title" content="Cambridge Community Kitchen" />
				<title>Cambridge Community Kitchen</title>
			</Head>
			<LayoutContainer>
				<Hero />
			</LayoutContainer>
		</>
	);
};

export default Home;
