import { useMemo } from 'react';
import Image from 'next/image';
import { Box, Flex, VStack, Button, Link } from '@chakra-ui/react';
import {
	FaHandsHelping,
	FaDonate,
	FaWpforms,
	FaSeedling,
	FaBookOpen,
} from 'react-icons/fa';

import Footer from '@components/Footer';

export default function Home() {
	const browserLanguage = useMemo(
		() => window.navigator.language.split('-')[0],
	);

	return (
		<div>
			<Box height="calc(100vh - 64px)">
				<Flex justifyContent="center" pt={4}>
					<Image
						alt="Cambridge Community Kitchen logo"
						src="/cck-logo-round.png"
						width="200"
						height="200"
					/>
				</Flex>
				<VStack spacing={4} mt={16}>
					<Link href="https://bit.ly/CCKnewvolunteers">
						<Button leftIcon={<FaHandsHelping />} size="lg">
							Become a volunteer
						</Button>
					</Link>
					<Link href="https://opencollective.com/cambridge-community-kitchen">
						<Button leftIcon={<FaDonate />} size="lg">
							Donate
						</Button>
					</Link>
					<Link href="https://bit.ly/CCKrequest">
						<Button leftIcon={<FaWpforms />} size="lg">
							Meal request form
						</Button>
					</Link>
					<Link href="https://bit.ly/CCKwelcomepack">
						<Button leftIcon={<FaSeedling />} size="lg">
							Volunteer welcome pack
						</Button>
					</Link>
					<Link href={`${browserLanguage}.pdf`}>
						<Button leftIcon={<FaBookOpen />} size="lg">
							More info
						</Button>
					</Link>
				</VStack>
			</Box>
			<Footer />
		</div>
	);
}
