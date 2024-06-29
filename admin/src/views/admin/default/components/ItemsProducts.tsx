
import { Avatar, Flex, WrapItem } from '@chakra-ui/react';
// Custom components

export default function ItemsProducts(props: any){
	const images = JSON.parse(props.data.new_images);

	return (
		<Flex justifyContent='space-between' alignItems='center' w='100%' mt='3' style={{fontSize: 14}}>
		<div style={{display: 'flex', gap: 10}}>
		<WrapItem>
			<Avatar name='Image' src={images[0]} />
		  </WrapItem>
		<div style={{minWidth: '135px', maxWidth: '135px'}}>
			<div style={{fontWeight: 'bold'}}>{props.data.category_name.length > 15 ?
    `${props.data.category_name.substring(0, 15)}...` : props.data.category_name
  }</div>
			<div>{props.data.product_name.length > 15 ?
    `${props.data.product_name.substring(0, 15)}...` : props.data.product_name
  }</div>
			</div>
		</div>
		<div>
			<div style={{fontWeight: 'bold'}}>Vendas</div>
			<div>{props.data.total}</div>
		</div>
		<div style={{fontWeight: 'bold'}}>
			TOP {props.index + 1}
		</div>
	</Flex>
	);
}