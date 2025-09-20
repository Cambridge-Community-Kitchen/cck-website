import LayoutContainer from '@components/layout-container';
import { NextSeo } from 'next-seo';
import { GraphQLClient } from 'graphql-request';
import { Box, Heading, useBreakpointValue, Flex } from '@chakra-ui/react';
import styles from './blog/post.module.scss';
import { SanitizedHtml } from '@components/html/SanitizedHtml';

const { OPENCOLLECTIVE_API_TOKEN } = process.env;

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
							About Cambridge Community Kitchen
						</Heading>
						<SanitizedHtml html={page} />
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps() {
	const client = new GraphQLClient(
		'https://api.opencollective.com/graphql/v2',
		{
			headers: {
				authorization: `Bearer ${OPENCOLLECTIVE_API_TOKEN}`
			}
		}
	);

	const response = await client.request(`
		{
			collective(slug: "cambridge-community-kitchen") {
				longDescription
			}
		}
	`);

	return {
		props: {
			page: response?.collective?.longDescription,
		},
		revalidate: 10800, // cache for 3 hours
	};
}

export default About;
