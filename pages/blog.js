import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import {
	Box,
	Grid,
	Center,
	Heading,
	Text,
	Stack,
	Avatar,
	useBreakpointValue,
	useColorModeValue,
	position,
	Link,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import LayoutContainer from '../components/layout-container';

const Blog = ({ posts }) => {
	return (
		<LayoutContainer>
			<Center py={6} mt={10} mb={8}>
				<Grid
					autoFlow
					templateColumns={useBreakpointValue({
						base: 'repeat(1, 1fr)',
						md: 'repeat(2, 1fr)',
					})}
					gap={16}
				>
					{posts.map((post) => {
						return (
							<Link href={`blog/${post.slug}`}>
								<Box
									maxW={'445px'}
									w={'full'}
									bg={useColorModeValue('white', 'gray.900')}
									boxShadow="xl"
									rounded={'md'}
									key={post.slug}
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
										<Text
											color={'green.500'}
											textTransform={'uppercase'}
											fontWeight={800}
											fontSize={'sm'}
											letterSpacing={1.1}
										>
											Blog
										</Text>
										<Heading
											color={useColorModeValue('gray.700', 'white')}
											fontSize={'2xl'}
											fontFamily={'body'}
										>
											{post.title}
										</Heading>
										<Text color={'gray.500'}>{post.excerpt}</Text>
									</Stack>
									<Stack mt={6} direction={'row'} spacing={4} align={'center'}>
										<Stack direction={'column'} spacing={0} fontSize={'sm'}>
											<Text color={'gray.500'}>
												{dayjs(post.date).format('MMM DD, YYYY')}
											</Text>
										</Stack>
									</Stack>
								</Box>
							</Link>
						);
					})}
				</Grid>
			</Center>
		</LayoutContainer>
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
