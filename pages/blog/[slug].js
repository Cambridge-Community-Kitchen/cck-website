import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GraphQLClient } from 'graphql-request';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

import LayoutContainer from '@components/layout-container';
import styles from './post.module.scss';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

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

	if (!post.content || post.notFound) {
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
				description={post.excerpt}
				openGraph={{
					title: `${post.title} | Cambridge Community Kitchen`,
					description: post.excerpt,
					images: [{ url: post.coverImage.url }],
					type: 'article',
				}}
			/>
			<LayoutContainer>
				<Flex flexDirection="column" alignItems="center" py={6}>
					<Box maxWidth={boxBreakpointValue}>
						<Box h={'350px'} bg={'gray.100'} mt={-6} mb={6} pos={'relative'}>
							<Image
								src={post.coverImage.url}
								layout="fill"
								objectFit="cover"
							/>
						</Box>
						<Heading>{post.title}</Heading>
						<time>{dayjs(post.date).format('MMM DD, YYYY')}</time>
						<ReactMarkdown className={styles.content}>
							{post.content.markdown}
						</ReactMarkdown>
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps({ params }) {
	try {
		const { post } = await graphcms.request(
			`
			query BlogPostQuery($slug: String!){
				post(where: {slug: $slug}) {
					title
					date
					excerpt
					slug
					content {
						markdown
					}
					coverImage {
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
				post,
			},
			revalidate: 5,
		};
	} catch (error) {
		return { props: { post: { notFound: true } } };
	}
}

export async function getStaticPaths() {
	const { posts } = await graphcms.request(`{
	posts {
		slug
		title
		}
	}`);

	const paths = posts.map(({ slug }) => `/blog/${slug}`);

	return {
		paths,
		fallback: false,
	};
}

export default Post;
