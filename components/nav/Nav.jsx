import NextLink from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverContent,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons';
import styles from './Nav.module.scss';

export default function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure();
	const router = useRouter();

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align="center"
				justifyContent="space-between"
			>
				<Flex flexBasis="55%" justifyContent="space-between">
					<Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
						<IconButton
							onClick={onToggle}
							icon={
								isOpen ? (
									<CloseIcon w={3} h={3} />
								) : (
									<HamburgerIcon w={5} h={5} />
								)
							}
							variant={'ghost'}
							aria-label={'Toggle Navigation'}
						/>
					</Flex>
					<Flex alignItems="center" justify={{ base: 'center', md: 'start' }}>
						<Link as={NextLink} href="/">
							<a>
								<Image
									alt="Cambridge Community Kitchen logo"
									src="/cck-simple.png"
									width="36"
									height="30"
								/>
							</a>
						</Link>

						<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
							<DesktopNav currentPathname={router.pathname} />
						</Flex>
					</Flex>
				</Flex>

				<Link
					href="https://opencollective.com/cambridge-community-kitchen#category-CONTRIBUTE"
					isExternal
				>
					<Button
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'green.400'}
						_hover={{
							bg: 'green.300',
						}}
					>
						Donate
					</Button>
				</Link>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = ({ currentPathname }) => {
	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Flex alignItems="center" key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						{/* <PopoverTrigger> */}
						{navItem.newWindow ? (
							<Link as={NextLink} href={navItem.href} passHref>
								<a
									className={classnames(
										styles.navLink,
										currentPathname === navItem.href && styles.active,
									)}
									target="_blank"
								>
									{navItem.label}
								</a>
							</Link>
						) : (
							<Link as={NextLink} href={navItem.href}>
								<a
									className={classnames(
										styles.navLink,
										currentPathname === navItem.href && styles.active,
									)}
								>
									{navItem.label}
								</a>
							</Link>
						)}
						{/* </PopoverTrigger> */}

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={'white'}
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Flex>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			as={NextLink}
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
		>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}
				>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
				>
					{children &&
						children.map((child) => (
							<Link as={NextLink} key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: 'About',
		href: '/about',
	},
	// {
	// 	label: 'Events',
	// 	href: '/events',
	// },
	{
		label: 'Blog',
		href: '/blog',
		// children: [
		// 	{
		// 		label: 'Explore Design Work',
		// 		subLabel: 'Trending Design to inspire you',
		// 		href: '#',
		// 	},
		// 	{
		// 		label: 'New & Noteworthy',
		// 		subLabel: 'Up-and-coming Designers',
		// 		href: '#',
		// 	},
		// ],
	},
	{
		label: 'Volunteer Info',
		href: 'https://bit.ly/CCKwelcomepack',
		newWindow: true,
	},
	// {
	// 	label: 'More Info',
	// 	href: '/info',
	// },
];
