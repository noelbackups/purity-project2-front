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
import { editAdmin, listAdmins, addAdmin, deleteAdmin } from 'services';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import ModalAdmin from './components/ModalAdmin';
import AlertAdmin from './components/AlertAdmin';
type RowObj = {
	id: number;
	name: string;
	email: string;
	phone: string;
	action: any;
};


export default function Settings() {
	const { enqueueSnackbar } = useSnackbar();
	const columnHelper = createColumnHelper<RowObj>();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
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
		email: '',
		phone: '',
		password: ''
	});
	
	const [addRow, setAddRow] = useState({
		name: '',
		email: '',
		phone: '',
		password: ''
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
			const post = await editAdmin(data);
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
			const post = await addAdmin(addRow);
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
			const post = await deleteAdmin({id: deleteId});
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
		const getAdmins = async () => {
			try {
				const get = await listAdmins(data);
				if (get) {
					setTableData(get.data.data);
					setTotalPages(get.data.total_pages);
				}

			} catch (e) {
				console.log(e);
			}
		}

		getAdmins();
	}, [page, reload])

	//Update table
	useEffect(() => {
		if(tableData.length > 0){
		const tableDataUpdated = tableData;
		setTableData([]);
		setTimeout(() =>
			setTableData(tableDataUpdated), 600)
	}
	}, [refresh])


	const columns = [

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
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('phone', {
			id: 'phone',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Telefone
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
					nameTable="Lista de Administradores" />
			</SimpleGrid>
			<ModalAdmin
				isEdit={isEdit}
				editRow={editRow}
				addRow={addRow}
				setOpenModal={setOpenModal}
				openModal={openModal}
				handleChangeAdd={handleChangeAdd}
				handleChangeEdit={handleChangeEdit}
				confirmAdd={confirmAdd}
				confirmChanges={confirmChanges}
			/>
			<AlertAdmin
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				delete={confirmDelete}
			/>
		</Box>
	);
}
