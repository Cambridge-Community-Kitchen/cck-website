import { NextSeo } from 'next-seo';
import { GraphQLClient } from 'graphql-request';
import {
	Heading,
	VStack,
	useBreakpointValue,
	Flex,
	Container,
} from '@chakra-ui/react';

import LayoutContainer from '@components/layout-container';
import Card from '@components/events/card';

function SafeHydrate({ children }) {
	// This prevents the app from rendering on the server
	// done because of some layout bugs caused by server rendering
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : children}
		</div>
	);
}

const Events = ({ events }) => {
	// console.log(events);
	return (
		<>
			<NextSeo
				title="Events | Cambridge Community Kitchen"
				description="Upcoming events and fundraisers from Cambridge Community Kitchen"
				openGraph={{
					title: 'Events | Cambridge Community Kitchen',
					description:
						'Upcoming events and fundraisers from Cambridge Community Kitchen',
					images: [{ url: 'https://cckitchen.uk/cck-preview.png' }],
					url: 'https://cckitchen.uk/events',
					type: 'website',
				}}
			/>
			<SafeHydrate>
				<LayoutContainer>
					<Flex justifyContent="center">
						<Container
							maxWidth={useBreakpointValue({ base: '90%', md: '750px' })}
							mb={8}
						>
							<Heading as="h1" mb={8}>
								Events
							</Heading>
							<VStack spacing={12}>
								{events.map((event) => (
									<Card event={event} key={event.id} />
								))}
							</VStack>
						</Container>
					</Flex>
				</LayoutContainer>
			</SafeHydrate>
		</>
	);
};

export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

	const { events } = await graphcms.request(`
	{
		events(orderBy: date_DESC) {
			id
			title
			date
			slug
			description {
				markdown
				text
			}
			location
			image {
				url
			}
		}
	}`);

	return {
		props: {
			events,
		},
		revalidate: 10,
	};
}

export default Events;
