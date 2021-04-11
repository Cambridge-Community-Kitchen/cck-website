import Image from 'next/image';
import { Flex, Stack, Button, Link } from '@chakra-ui/react';

export default function Home() {
	return (
		<div>
			<Flex justifyContent="center" mt={4}>
				<Image
					alt="Cambridge Community Kitchen logo"
					src="/cck-logo-round.png"
					width="200"
					height="200"
				/>
			</Flex>
			<Stack spacing={4} direction="column" align="center" mt={8}>
				<Link href="https://bit.ly/CCKnewvolunteers">
					<Button size="lg">Become a volunteer</Button>
				</Link>
			</Stack>
		</div>
	);
}
