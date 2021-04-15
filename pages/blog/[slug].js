import Head from 'next/head';
import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

import LayoutContainer from '@components/layout-container';
import styles from './post.module.scss';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

const Post = ({ post }) => {
	return (
		<>
			<Head>
				<meta property="og:image" content={post.coverImage.url} />
				<meta property="og:description" content={post.excerpt} />
				<meta name="description" content={post.excerpt} />
				<meta
					property="og:title"
					content={`${post.title} | Cambridge Community Kitchen`}
				/>
				<title>{`${post.title} | Cambridge Community Kitchen`}</title>
			</Head>
			<LayoutContainer>
				<Flex flexDirection="column" alignItems="center" py={6}>
					<Box maxWidth={useBreakpointValue({ base: '90%', md: '650px' })}>
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

export default Post;

export async function getStaticProps({ params }) {
	const { post } = await graphcms.request(
		`
		query ProductPageQuery($slug: String!){
			post(where: {slug: $slug}) {
				title
				date
				excerpt
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
	};
}

export async function getStaticPaths() {
	const { posts } = await graphcms.request(`{
	posts {
		slug
		title
		}
	}`);

	return {
		paths: posts.map(({ slug }) => ({ params: { slug } })),
		fallback: false,
	};
}
