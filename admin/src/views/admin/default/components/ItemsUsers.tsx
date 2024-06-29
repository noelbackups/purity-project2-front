
import { Avatar, Flex, WrapItem } from '@chakra-ui/react';
// Custom components

export default function ItemsUsers(props: any){

	return (
		<Flex justifyContent='space-between' alignItems='center' w='100%' mt='3' style={{fontSize: 14}}>
		<div style={{display: 'flex', gap: 10}}>
		<WrapItem>
			<Avatar name={props.data.email} />
		  </WrapItem>
		<div style={{minWidth: '135px', maxWidth: '135px'}}>
			<div style={{fontWeight: 'bold'}}>Usuário</div>
			<div>{props.data.email.length > 15 ?
    `${props.data.email.substring(0, 15)}...` : props.data.email
  }</div>
			</div>
		</div>
		<div>
			<div style={{fontWeight: 'bold'}}>Compras</div>
			<div>{props.data.total}</div>
		</div>
		<div style={{fontWeight: 'bold'}}>
			TOP {props.index + 1}
		</div>
	</Flex>
	);
}