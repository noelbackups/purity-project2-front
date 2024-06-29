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
import { deleteSale, listSales } from 'services';
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
	category_name: string;
	product_name: string;
	amount: number;
	email: string;
	status: any;
	price: number;
	hash: string;
	keys:any;
	payment_id: string;
	action: any,
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
				const get = await listSales(data);
				if (get) {
					setTableData(get.data.data);
					setStatistics(get.data.stastitics)
					setTotalPages(get.data.total_pages);
				}

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

	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',

	});

	async function confirmDelete() {
		try {
			const post = await deleteSale({id: deleteId});
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
		
		columnHelper.accessor('category_name', {
			id: 'category_name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Categoria
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('product_name', {
			id: 'product_name',
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
					{info.getValue()} {info.row.original.amount}x
				</Text>
			)
		}),
		
		columnHelper.accessor('status', {
			id: 'status',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Status
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					<Flex align="center">
					<Icon
						w='24px'
						h='24px'
						me='5px'
						color={
							info.getValue() === "approved" ? (
								'green.500'
							) : info.getValue() === "pending" ? (
								'orange.500'
							) : info.getValue() === "refunded" ? (
								'blue.500'
							) : info.getValue() === "cancelled" ? (
								'red.500'
							) : null
						}
						as={
							info.getValue() === "approved" ? (
								MdCheckCircle
							) : info.getValue() === "pending" ? (
								MdOutlineError
							) : info.getValue() === "refunded" ? (
								RiRefund2Line
							) : info.getValue() === "cancelled" ? (
								MdCancel
							) : null
						}
					/>
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{info.getValue() === "approved" ? (
							'Aprovado'
						) : info.getValue() === "pending" ? (
							'Pendente'
						) : info.getValue() === "refunded" ? (
							'Reembolsado'
						) : info.getValue() === "cancelled" ? (
							'Expirado'
						): null}
					</Text>
				</Flex>
				</Text>
			)
		}),
		columnHelper.accessor('price', {
			id: 'price',

			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Valor
				</Text>
			),
			cell: (info) => (
			
			<Text color={textColor} fontSize='sm' fontWeight='500'>{formatter.format(info.getValue())}</Text>
					
			)
		}),
		columnHelper.accessor('email', {
			id: 'email',

			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					E-mail
				</Text>
			),
			cell: (info) => (
			
			<Text color={textColor} fontSize='sm' fontWeight='500'>{info.getValue()}</Text>
					
			)
		}),
columnHelper.accessor('price', {
			id: 'price',

			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Inf.
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					<Popover
					>
						<PopoverTrigger>
							<Button ><Icon as={MdInfoOutline} w='18px' h='18px' /></Button>
						</PopoverTrigger>
						<PopoverContent style={{ boxShadow: 'none' }}>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>Informa&ccedil;&otilde;es do cliente</PopoverHeader>
							<PopoverBody>
								<Text>ID MercadoPago: {info.row.original.payment_id}</Text>
								<Text>Hash de confirmação: {info.row.original.hash}</Text>
								<Text>Chave(s): </Text>
								<>
									{info.row.original.keys.map((value: any) => (
									<Text>{value}</Text>
								))}
								</>
							</PopoverBody>
						</PopoverContent>
					</Popover>
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
		})
	];
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<MiniStatistics name='Aprovados' value={statistics?.approved} />
				<MiniStatistics name='Pendentes' value={statistics?.pending} />
				<MiniStatistics name='Expirados' value={statistics?.cancelled} />
			</SimpleGrid>
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
				<ColumnsTable
					page={page}
					setPage={setPage}
					totalPages={totalPages}
					tableData={tableData}
					columnsData={columns}
					nameTable="Lista de compras" />
			</SimpleGrid>
			<AlertDelete
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				delete={confirmDelete}
			/>
		</Box>
	);
}
