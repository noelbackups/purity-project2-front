/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components

import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';

import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import { useEffect, useState } from 'react';
import { getTopProducts, getTopusers } from 'services';
import TopProdutos from './components/TopProdutos';
import TopUsers from './components/TopUsers';

export default function UserReports() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const [performance, setPerformance] = useState(0);
	const [purchases, setPurchases] = useState(0);
	const [totalclients, setTotalclients] = useState(0);

	const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(()=>{
        async function topProducts() {
            try {

                const post = await getTopProducts();
				setProducts(post.data.data);
				setPerformance(post.data.statistics.performance)
				setPurchases(post.data.statistics.total)
				setTotalclients(post.data.statistics.total_clients)
            } catch (e) {
                console.log(e)
            }
        }

		async function topUsers() {
            try {

                const post = await getTopusers();
				setUsers(post.data.data);
				console.log(post.data.data)
            } catch (e) {
                console.log(e)
            }
        }
		topUsers();
        topProducts();
    }, [])
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />}
						/>
					}
					name='Ganhos'
					value={performance}
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
						/>
					}
					name='Vendas'
					value={purchases}
				/>
				<MiniStatistics name='Clientes' value={totalclients} />
		
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<TopProdutos data={products} />
				<TopUsers data={users} />
			</SimpleGrid>
			
		</Box>
	);
}
