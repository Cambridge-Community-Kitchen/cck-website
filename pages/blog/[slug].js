import Head from 'next/head';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GraphQLClient } from 'graphql-request';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

import LayoutContainer from '@components/layout-container';
import styles from './post.module.scss';
import { SanitizedHtml } from '@components/html/SanitizedHtml';

const { OPENCOLLECTIVE_API_TOKEN } = process.env;

const client = new GraphQLClient(
	'https://api.opencollective.com/graphql/v2',
	{
		headers: {
			authorization: `Bearer ${OPENCOLLECTIVE_API_TOKEN}`
		}
	}
);

const Post = ({ post }) => {
	const router = useRouter();

	const boxBreakpointValue = useBreakpointValue({ base: '90%', md: '650px' });

	if (router.isFallback) {
		return (
			<LayoutContainer>
				<h1>Please wait…</h1>
			</LayoutContainer>
		);
	}

	if (!post.html || post.notFound) {
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
				title={`${post.title} | Cambridge Community Kitchen`}
				description={post.summary}
				openGraph={{
					title: `${post.title} | Cambridge Community Kitchen`,
					description: post.summary,
					images: [{ url: post.coverImage?.url }],
					type: 'article',
				}}
			/>
			<LayoutContainer>
				<Flex flexDirection="column" alignItems="center" py={6}>
					<Box maxWidth={boxBreakpointValue}>
						<Box h={'350px'} bg={'gray.100'} mt={-6} mb={6} pos={'relative'}>
							<Image
								src={post.coverImage?.url ?? '/cck-logo-round.png'}
								layout="fill"
								objectFit="cover"
							/>
						</Box>
						<Heading>{post.title}</Heading>
						<time>{dayjs(post.date).format('DD MMMM YYYY')}</time>
						<SanitizedHtml html={post.html} />
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps({ params }) {
	try {
		const response = await client.request(`
			{
				collective(slug: "cambridge-community-kitchen") {
					updates {
						nodes {
							id
							slug
							summary
							title
							html
						}
					}
				}
			}
		`, {
			slug: params.slug,
		});

		return {
			props: {
				post: response.collective.updates.nodes.filter(
					(node) => node.slug === params.slug
				)[0],
			},
			revalidate: 1200, // cache for 20 minutes
		};
	} catch (error) {
		console.error(error);

		return {
			props: {
				post: { notFound: true }
			},
			revalidate: 300, // cache for 5 minutes
		};
	}
}

export async function getStaticPaths() {
	const response = await client.request(`
		{
			collective(slug: "cambridge-community-kitchen") {
				updates {
					nodes {
						id
						slug
						summary
						title
						html
					}
				}
			}
		}
	`);

	const posts = response.collective.updates.nodes

	const paths = posts.map(({ slug }) => `/blog/${slug}`);

	return {
		paths,
		fallback: false,
	};
}

export default Post;
