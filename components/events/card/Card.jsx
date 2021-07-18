import { memo } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import {
	Box,
	Flex,
	Spacer,
	Heading,
	Stack,
	Text,
	Icon,
	Link,
	useBreakpointValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import dayjs from 'dayjs';

const Card = ({ event }) => {
	const [isDesktop] = useMediaQuery('(min-width: 760px)');

	return (
		<Link as={NextLink} href={`events/${event.slug}`} key={event.slug}>
			<Box
				bg="white"
				cursor="pointer"
				rounded="md"
				boxShadow={useBreakpointValue({ base: '2xl', lg: 'xl' })}
				transition="box-shadow 300ms ease-in-out"
				_hover={{ boxShadow: '2xl' }}
			>
				<Flex
					justifyContent="space-between"
					direction={useBreakpointValue({ base: 'column', lg: 'row' })}
				>
					<Box
						width={useBreakpointValue({ base: '100%', lg: '200px' })}
						height="200px"
						pos="relative"
					>
						{isDesktop ? (
							<Image
								src={event.image.url}
								width="200px"
								height="200px"
								objectFit="cover"
								layout="fixed"
							/>
						) : (
							<Image src={event.image.url} objectFit="cover" layout="fill" />
						)}
					</Box>
					<Spacer />
					<Box ml={useBreakpointValue({ base: 0, lg: 6 })} p={4}>
						<Heading as="h2" fontSize="2xl">
							{event.title}
						</Heading>
						<Stack
							alignItems={useBreakpointValue({
								base: 'flex-start',
								lg: 'center',
							})}
							direction={useBreakpointValue({ base: 'column', lg: 'row' })}
							spacing={useBreakpointValue({ base: 1, lg: 4 })}
							mb={4}
						>
							<Text as="time" fontSize="sm" color="gray.600">
								{dayjs(event.date).format('MMM DD, YYYY HH:mm')}
							</Text>
							<Text
								fontSize="sm"
								color="gray.600"
								display="flex"
								alignItems="center"
							>
								<Icon
									as={HiOutlineLocationMarker}
									color="green.500"
									mr={1}
									fontSize="md"
								/>
								{event.location}
							</Text>
						</Stack>
						<Text noOfLines={3} color="gray.600">
							{event.description.text}
						</Text>
					</Box>
				</Flex>
			</Box>
		</Link>
	);
};

export default memo(Card);
