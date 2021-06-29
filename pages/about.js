import LayoutContainer from '@components/layout-container';
import { NextSeo } from 'next-seo';
import { GraphQLClient } from 'graphql-request';
import ReactMarkdown from 'react-markdown';
import { Box, Heading, useBreakpointValue, Flex } from '@chakra-ui/react';
import styles from './blog/post.module.scss';

const About = ({ page }) => {
	return (
		<>
			<NextSeo
				title="About | Cambridge Community Kitchen"
				description="We are a food solidarity collective tackling food poverty in Cambridge"
				openGraph={{
					title: 'About | Cambridge Community Kitchen',
					description:
						'We are a food solidarity collective tackling food poverty in Cambridge',
					images: [{ url: 'https://cckitchen.uk/cck-preview.png' }],
					url: 'https://cckitchen.uk/about',
				}}
			/>
			<LayoutContainer>
				<Flex justifyContent="center">
					<Box
						maxWidth={useBreakpointValue({ base: '90%', md: '650px' })}
						mb={8}
					>
						<Heading as="h1" mb={8}>
							{page.title}
						</Heading>
						<ReactMarkdown className={styles.content}>
							{page.content.markdown}
						</ReactMarkdown>
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

	const { page } = await graphcms.request(`
	{
		page(where: {slug: "about"}) {
			content {
				markdown
			}
			title
		}
	}
	`);

	return {
		props: {
			page,
		},
		revalidate: 10,
	};
}

export default About;
