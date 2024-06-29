import { Flex, Box, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Stack, Button } from '@chakra-ui/react';
import * as React from 'react';

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Pager from './Pager';
import { Skeleton} from '@chakra-ui/react'

export default function ColumnTable(props: { tableData: any, columnsData: any, nameTable: string, page: any, setPage: any, totalPages: number, openModal?: any }) {
	const { tableData } = props;
	const { columnsData } = props;
	const { nameTable } = props;
	const { totalPages } = props;
	const { openModal } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const { page, setPage } = props;

	const table = useReactTable({
		data: tableData,
		columns: columnsData,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					{nameTable}
				</Text>
				<Button onClick={openModal} colorScheme='blue'>Adicionar</Button>
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.length > 0 ?
							table.getRowModel().rows.map((row) => {
								return (
									<Tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Td
													key={cell.id}
													fontSize={{ sm: '14px' }}
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
													borderColor='transparent'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Td>
											);
										})}
									</Tr>
								);
							}) :
							table.getHeaderGroups().map((headerGroup) => (
								headerGroup.headers.map((header) => {
									return (
										<Td>
											<Stack spacing={18}>
												<Skeleton height='20px' />
												<Skeleton height='20px' />
												<Skeleton height='20px' />
												<Skeleton height='20px' />
												<Skeleton height='20px' />
												<Skeleton height='20px' />
											</Stack>
										</Td>)
								})))}
					</Tbody>

				</Table>
				<Pager setPage={setPage} page={page} pageCount={totalPages} />
			</Box>
		</Card>
	);
} 