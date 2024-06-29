// Chakra imports
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoMode = useColorModeValue(require('./../../../assets/img/logo_dark.png'), require('./../../../assets/img/logo_white.png'));

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image
				style={{ maxWidth: '40%', marginBottom: 10 }}
				src={logoMode} alt='Purity logo' />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
