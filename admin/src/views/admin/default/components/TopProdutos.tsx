// Chakra imports
import { Avatar, Box, Button, Flex, Heading, Icon, Text, WrapItem, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import ItemsProducts from './ItemsProducts';
import { MdBarChart } from 'react-icons/md';

export default function TopProdutos(props: { [x: string]: any }) {
	const { ...rest} = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	return (
		<Card alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<Flex align='center' w='100%' px='15px' py='10px'>
				<Text me='auto' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					TOP Produtos
				</Text>
				<Button
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
				</Button>
			</Flex>
			{props.data.map((value:any, index: any) => (
				<ItemsProducts data={value} index={index} />
			))}
		</Card>
	);
}
