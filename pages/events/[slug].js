import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GraphQLClient } from 'graphql-request';
import {
	Box,
	Button,
	Heading,
	Flex,
	Text,
	Icon,
	Link,
	useBreakpointValue,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import LayoutContainer from '@components/layout-container';
import styles from './event.module.scss';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

const Event = ({ event }) => {
	const router = useRouter();

	const boxBreakpointValue = useBreakpointValue({ base: '90%', md: '650px' });

	if (router.isFallback) {
		return (
			<LayoutContainer>
				<h1>Please wait…</h1>
			</LayoutContainer>
		);
	}

	if (!event.description || event.notFound) {
		return (
			<LayoutContainer>
				<Head>
					<meta name="robots" content="noindex" />
				</Head>
				<Error statusCode={404} />
			</LayoutContainer>
		);
	}

	return (
		<>
			<NextSeo
				title={`${event.title} | Cambridge Community Kitchen`}
				description={event.description.text.slice(0, 50)}
				openGraph={{
					title: `${event.title} | Cambridge Community Kitchen`,
					description: event.description.text.slice(0, 50),
					images: [{ url: event.image.url }],
					type: 'article',
				}}
			/>
			<LayoutContainer>
				<Flex flexDirection="column" alignItems="center" py={6}>
					<Box maxWidth={boxBreakpointValue}>
						<Box h={'380px'} bg={'gray.100'} mt={-6} mb={6} pos={'relative'}>
							<Image src={event.image.url} layout="fill" objectFit="cover" />
						</Box>
						<Heading>{event.title}</Heading>
						<time>{dayjs(event.date).format('MMM DD, YYYY, HH:mm')}</time>
						<Box display="flex" justifyContent="space-between">
							<Text
								fontSize="lg"
								color="gray.600"
								display="flex"
								fontWeight="700"
								alignItems="center"
								mt={2}
							>
								<Icon
									as={HiOutlineLocationMarker}
									color="green.500"
									mr={1}
									fontSize="lg"
								/>
								{event.location}
							</Text>
							{event.link && (
								<Link href={event.link} isExternal>
									<Button
										fontSize={'sm'}
										fontWeight={600}
										color={'white'}
										bg={'green.400'}
										_hover={{
											bg: 'green.300',
										}}
									>
										Register
									</Button>
								</Link>
							)}
						</Box>
						<ReactMarkdown className={styles.content}>
							{event.description.markdown}
						</ReactMarkdown>
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps({ params }) {
	try {
		const { event } = await graphcms.request(
			`
			query EventQuery($slug: String!){
				event(where: {slug: $slug}) {
					title
					date
					slug
					location
					link
					description {
						markdown
						text
					}
					image {
						url
					}
				}
			}`,
			{
				slug: params.slug,
			},
		);

		return {
			props: {
				event,
			},
			revalidate: 5,
		};
	} catch (error) {
		return { props: { event: { notFound: true } } };
	}
}

export async function getStaticPaths() {
	const { events } = await graphcms.request(`{
	events {
		slug
		title
		}
	}`);

	const paths = events.map(({ slug }) => `/events/${slug}`);

	return {
		paths,
		fallback: false,
	};
}

export default Event;
