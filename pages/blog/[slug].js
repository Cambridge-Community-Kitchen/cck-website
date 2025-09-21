import Head from 'next/head';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

import LayoutContainer from '@components/layout-container';
import { SanitizedHtml } from '@components/html/SanitizedHtml';
import { getAllPosts, getPost } from '@services/opencollective';


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
	const post = await getPost(params.slug);

	return (
		post
			? {
				props: {
					post,
				},
				revalidate: 1200, // cache for 20 minutes
			}
			: {
				props: {
					post: { notFound: true }
				},
				revalidate: 300, // cache for 5 minutes
			}
	);
}

export async function getStaticPaths() {
	const posts = await getAllPosts();

	return {
		paths: posts.map(
			({ slug }) => `/blog/${slug}`
		),
		revalidate: 1200, // cache for 20 minutes
	};
}

export default Post;
