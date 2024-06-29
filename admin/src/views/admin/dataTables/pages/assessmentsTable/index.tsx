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
import { Box, SimpleGrid, Flex, Text, useColorModeValue, Button, Icon, ButtonGroup, Tooltip, IconButton } from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { deleteAvaliacao, deleteSale, getAvaliacoes, listSales } from 'services';
import MiniStatistics from 'components/card/MiniStatistics';
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
} from '@chakra-ui/react'
import {
	PopoverTrigger as OrigPopoverTrigger
} from '@chakra-ui/react'
import { MdCancel, MdCheckCircle, MdInfoOutline, MdOutlineDelete, MdOutlineError } from 'react-icons/md';
import { RiRefund2Line } from 'react-icons/ri';
import AlertDelete from './components/AlertDelete';
import { useSnackbar } from 'notistack';
import UserReports from 'views/admin/default';

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
	OrigPopoverTrigger

type RowObj = {
	id: number;
	nickname: string;
	description: string;
	stars: number;
	product: string;
	category: string;
	action: any;
};

export default function Settings() {
	const { enqueueSnackbar } = useSnackbar();
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

	const columnHelper = createColumnHelper<RowObj>();
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [tableData, setTableData] = useState([]);
	const [deleteId, setDeleteId] = useState(0);
	const [openAlert, setOpenAlert] = useState(false);
	const [reload, setReload] = useState(false);
	const [statistics, setStatistics] = useState(null);

	useEffect(() => {
		setTableData([]);
		const data = { page: page, pagination_limit: 30 }
		const getOffers = async () => {
			try {
				const get = await getAvaliacoes(data);
					setTableData(get.data.data);
				

			} catch (e) {
				console.log(e);
			}
		}

		getOffers();
	}, [page, reload])

	function openDeleteAlert(info: any){
		setDeleteId(info.row.original.id);
		setOpenAlert(true);
	}


	async function confirmDelete() {
		try {
			const post = await deleteAvaliacao({id: deleteId});
			const { type, message } = post.data;
			if (type === 'success') {
				setPage(1);
				setReload(!reload);
			}
			enqueueSnackbar(message, { variant: type, autoHideDuration: 7000 });

		} catch (e) {
			console.log(e)
		}
	}

	const columns = [
		
		columnHelper.accessor('nickname', {
			id: 'nickname',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nickname
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('description', {
			id: 'description',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Descrição
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('stars', {
			id: 'stars',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Avaliação
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}/5
				</Text>
			)
		}),
		columnHelper.accessor('product', {
			id: 'product',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Produto
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.row.original.category} - {info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('action', {
			id: 'action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					A&ccedil;&otilde;es
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					<ButtonGroup size='sm' isAttached variant='outline'>
						<Tooltip label='Excluir' fontSize='md'>
							<IconButton onClick={() => openDeleteAlert(info)}  aria-label='Excluir' icon={<MdOutlineDelete />} />
						</Tooltip>
					</ButtonGroup>

				</Text>
			)
		}),
	];
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
				<ColumnsTable
					page={page}
					setPage={setPage}
					totalPages={totalPages}
					tableData={tableData}
					columnsData={columns}
					nameTable="Lista de avaliações" />
			</SimpleGrid>
			<AlertDelete
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				delete={confirmDelete}
			/>
		</Box>
	);
}
