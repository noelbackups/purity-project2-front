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
import { Box, SimpleGrid, Flex, Text, useColorModeValue, Button, Icon, Badge, ButtonGroup, IconButton, Tooltip, useDisclosure, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { listProducts, deleteProduct, addProduct, editProduct, listCategories } from 'services';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import ModalAdmin from './components/ModalAdmin';
import AlertDelete from './components/AlertDelete';

type RowObj = {
	id: number;
	category_id:0,
	category_name: string;
	keys: any;
	image: string;
	name: string;
	quantity: string;
	value:number;
	action: any;
};


export default function Settings() {
	const { enqueueSnackbar } = useSnackbar();
	const columnHelper = createColumnHelper<RowObj>();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [categories, setCategories] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [reload, setReload] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [deleteId, setDeleteId] = useState(0);
	const [editRow, setEditRow] = useState({
		index: -1,
		id: 0,
		name: '',
		category_id:0,
		image: '',
		value: '',
		keys: '',
		new_images:[]
	});
	
	const [addRow, setAddRow] = useState({
		name: '',
		category_id:0,
		image: '',
		value: '',
		keys: '',
		new_images:[]
	});

	function openEditModal(info: any) {
		setIsEdit(true);
		setEditRow(info.row.original);
		setEditRow(prevState => ({
			...prevState,
			index: info.row.index,
		}));
		setOpenModal(true);
	}

	function openDeleteAlert(info: any){
		setDeleteId(info.row.original.id);
		setOpenAlert(true);
	}

	function openAddModal(){
		setIsEdit(false);
		setOpenModal(true);
	}

	const handleChangeEdit = (e: any) => {
		const { name, value } = e.target;

		setEditRow(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleChangeAdd = (e: any) => {
		const { name, value } = e.target;
		setAddRow(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	async function confirmChanges() {
		try {
			const data = { data: editRow, id: editRow.id }
			const post = await editProduct(data);
			const { type, message } = post.data;
			enqueueSnackbar(message, { variant: type, autoHideDuration: 7000 });
			if (type === 'success') {
				tableData[editRow.index] = editRow;
				setRefresh(!refresh);
			}


		} catch (e) {
			console.log(e)
		}
	}

	async function confirmAdd() {
		try {
			const post = await addProduct(addRow);
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

	async function confirmDelete() {
		try {
			const post = await deleteProduct({id: deleteId});
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

	//Load and reload table xD
	useEffect(() => {
		setTableData([]);
		const data = { page: page, pagination_limit: 30 }
		const getProducts = async () => {
			try {
				const get = await listProducts(data);
				if (get) {
					Object.keys(get.data?.data).map(function (index, value) {
						get.data.data[index]['keys'] = get.data.data[index]['keys'].map((r: any) =>r).join("\n");

						return true;
					})
					setTableData(get.data.data);
					setTotalPages(get.data.total_pages);
				}

			} catch (e) {
				console.log(e);
			}
		}

		const getCategories = async () => {
			try {
				const get = await listCategories({ page: 1, pagination_limit: 30 });
				if (get) {
					setCategories(get.data.data);
				}

			} catch (e) {
				console.log(e);
			}
		}
		getCategories();
		getProducts();
	}, [page, reload])

	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',

	});

	//Update table
	useEffect(() => {
		if(tableData.length > 0){
		const tableDataUpdated = tableData;
		setTableData([]);
		setTimeout(() =>
			setTableData(tableDataUpdated), 400)
		}
	}, [refresh])


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
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nome
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('value', {
			id: 'value',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
						Preço
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{formatter.format(info.getValue())}
				</Text>
			)
		}),
		columnHelper.accessor('quantity', {
			id: 'quantity',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
						Chaves
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
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
						<Tooltip label='Editar' fontSize='md'>
							<IconButton onClick={() => openEditModal(info)} aria-label='Editar' icon={<MdEdit />} />
						</Tooltip>
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
					openModal={openAddModal}
					page={page}
					setPage={setPage}
					totalPages={totalPages}
					tableData={tableData}
					columnsData={columns}
					nameTable="Lista de produtos" />
			</SimpleGrid>
			<ModalAdmin
				isEdit={isEdit}
				editRow={editRow}
				addRow={addRow}
				categories={categories}
				setOpenModal={setOpenModal}
				openModal={openModal}
				handleChangeAdd={handleChangeAdd}
				handleChangeEdit={handleChangeEdit}
				confirmAdd={confirmAdd}
				confirmChanges={confirmChanges}
			/>
			<AlertDelete
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				delete={confirmDelete}
			/>
		</Box>
	);
}
