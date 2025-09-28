import LayoutContainer from '@components/layout-container';
import { NextSeo } from 'next-seo';
import { Box, Heading, useBreakpointValue, Flex, Button, Stack } from '@chakra-ui/react';
import { SanitizedHtml } from '@components/html/SanitizedHtml';
import { getCollectiveDescription } from '@services/opencollective';
import Link from 'next/link';

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

					<Stack
						marginTop={{ base: 4, sm: 6 }}
						direction={{ base: 'column', sm: 'row' }}
						justifyContent="space-evenly"
						spacing={{ base: 4, sm: 6 }}
						textAlign="center"
						width="100%"
					>
						{
							[
								{
									href: '/',
									label: 'Home page',
								},
								{
									href: 'https://bit.ly/CCKnewvolunteers',
									label: 'Volunteer',
								},
								{
									href: 'https://bit.ly/CCKrequest',
									label: 'Request meals',
								},
								{
									href: '/blog',
									label: 'News',
								}
							].map(
								(item) => (
									<Link href={item.href} key={item.href}>
										<Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
											{item.label}
										</Button>
									</Link>
								)
							)
						}
					</Stack>

					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {
			page: await getCollectiveDescription()
		},
		revalidate: 10800, // cache for 3 hours
	};
}

export default About;
