import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import {
	Box,
	Grid,
	Heading,
	Text,
	Stack,
	useBreakpointValue,
	Link,
	Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import LayoutContainer from '@components/layout-container';
import { getAllPosts } from '@services/opencollective';

const Blog = ({ posts }) => {
	return (
		<>
			<NextSeo
				title="News | Cambridge Community Kitchen"
				description="Updates from Cambridge Community Kitchen"
				openGraph={{
					title: 'News | Cambridge Community Kitchen',
					description: 'Updates from Cambridge Community Kitchen',
					images: [{ url: 'https://cckitchen.uk/cck-preview.png' }],
					url: 'https://cckitchen.uk/blog',
					type: 'website',
				}}
			/>
			<LayoutContainer>
				<Flex justifyContent="center">
					<Box
						maxWidth={useBreakpointValue({ base: '90%', md: '850px' })}
						mb={8}
					>
						<Heading mb={8}>News & Updates</Heading>
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
											bg="white"
											boxShadow="xl"
											rounded={'md'}
											p={6}
											overflow={'hidden'}
											transition="box-shadow 300ms ease-in-out"
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
													src={post.coverImage?.url ?? '/cck-logo-round.png' }
													layout="fill"
													objectFit="cover"
												/>
											</Box>
											<Stack>
												<Heading
													color="gray.700"
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
														{dayjs(post.publishedAt).format('DD MMMM YYYY')}
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
	return {
		props: {
			posts: await getAllPosts(),
		},
		revalidate: 1200, // cache for 20 minutes
	};
}

export default Blog;
