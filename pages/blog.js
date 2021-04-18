import Image from 'next/image';
import NextLink from 'next/link';
import Head from 'next/head';
import { GraphQLClient } from 'graphql-request';
import {
	Box,
	Grid,
	Heading,
	Text,
	Stack,
	useBreakpointValue,
	useColorModeValue,
	Link,
	Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import LayoutContainer from '@components/layout-container';

const Blog = ({ posts }) => {
	return (
		<>
			<Head>
				<meta
					property="og:title"
					content="Blog | Cambridge Community Kitchen"
				/>
				<title>Blog | Cambridge Community Kitchen</title>
				<meta property="og:type" content="article" />
			</Head>
			<LayoutContainer>
				<Flex justifyContent="center">
					<Box
						maxWidth={useBreakpointValue({ base: '90%', md: '850px' })}
						mb={8}
					>
						<Heading mb={8}>CCK Blog</Heading>
						<Grid
							templateColumns={useBreakpointValue({
								base: 'repeat(1, 1fr)',
								md: 'repeat(2, 1fr)',
							})}
							gap={useBreakpointValue({ base: 8, md: 16 })}
						>
							{posts.map((post) => {
								return (
									<Link
										as={NextLink}
										href={`blog/${post.slug}`}
										key={post.slug}
									>
										<Box
											cursor="pointer"
											maxW={'445px'}
											w={'full'}
											bg={useColorModeValue('white', 'gray.900')}
											boxShadow="xl"
											rounded={'md'}
											p={6}
											overflow={'hidden'}
											transition="transform 300ms ease-in-out, box-shadow 300ms ease-in-out"
											_hover={{ boxShadow: '2xl' }}
										>
											<Box
												h={'210px'}
												bg={'gray.100'}
												mt={-6}
												mx={-6}
												mb={6}
												pos={'relative'}
											>
												<Image
													src={post.coverImage.url}
													layout="fill"
													objectFit="cover"
												/>
											</Box>
											<Stack>
												<Heading
													color={useColorModeValue('gray.700', 'white')}
													fontSize={'2xl'}
													fontFamily={'body'}
												>
													{post.title}
												</Heading>
												<Text color={'gray.500'} minHeight="72px">
													{post.excerpt}
												</Text>
											</Stack>
											<Stack
												mt={6}
												direction={'row'}
												spacing={4}
												align={'center'}
											>
												<Stack direction={'column'} spacing={0} fontSize={'sm'}>
													<Text as="time" color={'gray.500'}>
														{dayjs(post.date).format('MMM DD, YYYY')}
													</Text>
												</Stack>
											</Stack>
										</Box>
									</Link>
								);
							})}
						</Grid>
					</Box>
				</Flex>
			</LayoutContainer>
		</>
	);
};

export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

	const { posts } = await graphcms.request(`{
		posts(orderBy: date_DESC) {
			slug
			title
			date
			excerpt
			coverImage {
				url
			}
		}
	}`);

	return {
		props: {
			posts,
		},
	};
}

export default Blog;
