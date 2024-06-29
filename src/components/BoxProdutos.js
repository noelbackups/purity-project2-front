import React, { useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

export const produtosLoad = [];

for (let i = 1; i < 4; i++) {
    produtosLoad.push(<Grid2 xs={12} sm={12} md={3}>
        <Stack direction="column" spacing={1}>
            <Skeleton variant="rounded" sx={{ bgcolor: 'grey.900' }} width="100%" height={118} />
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <div>
                        <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}><Skeleton sx={{ bgcolor: 'grey.900' }} width={100} /></div>
                        <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px' }}><Skeleton sx={{ bgcolor: 'grey.900' }} width={60} /></div>
                    </div>
                </Stack>
                <Button variant="contained" color="success" size="medium"
                    sx={{
                        '& ': {
                            fontFamily: 'Rubik',
                            fontSize: '13px'
                        }
                    }}
                >Comprar (R$00,00)</Button>
            </Stack>
        </Stack>
    </Grid2>
    );
}
function Item(props)
{
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', backgroundImage: 'url('+ props.item +')', backgroundSize: 'cover', height: 118, width: '100%', borderRadius: 5, backgroundSize: 'cover' }}>
            <div style={{ width: '100%', background: 'rgba(21, 22, 27, 0.71)', padding: 3, paddingLeft: 8, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <span style={{ fontWeight: 'bold', fontSize: 13, }}>{props.data.name}:</span> <span style={{ fontSize: 11, }}>{props.data.quantity} disponíveis</span>
            </div>
        </div>
    )
}
const BoxProdutos = (props) => {  
    const [quantity, setQuantity] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (text) => {
        //setAnchorEl(event.currentTarget);
        props.handleShowDesc(text);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Grid2 xs={12} sm={12} md={3}>
           
            <Stack direction="column" spacing={1}>
            <Carousel
            autoPlay={true}
            indicators={false}
            >
            {
                props.data.new_images.map( (item, i) => <Item key={i} item={item} data={props.data} /> )
            }
            </Carousel>
               
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <div style={{ border: '1px solid #D9D9D9', padding: 3, borderRadius: 5, cursor: 'pointer' }} onClick={() => handleClick(props.data.description)}><InfoIcon style={{ fontSize: 18 }} /></div>
                        <div style={{ border: '1px solid #D9D9D9', padding: 3, borderRadius: 5, cursor: 'pointer' }}>
                            <RemoveIcon
                                sx={{
                                    transition: '500ms',
                                    '&:hover': {
                                        opacity: 0.7
                                    }
                                }}
                                onClick={() => (quantity > 1) ? setQuantity(quantity - 1) : null} />
                            <span style={{ fontSize: 14, paddingRight: 3, paddingLeft: 3 }}>{quantity}</span>
                            <AddIcon
                                sx={{
                                    transition: '500ms',
                                    '&:hover': {
                                        opacity: 0.7
                                    }
                                }}
                                onClick={() => (quantity < props.data.quantity) ? setQuantity(quantity + 1) : null} />
                        </div>
                    </Stack>
                    <Button
                        disabled={(parseInt(props.data.quantity) === 0)}
                        onClick={() => props.handleShow(props.data.id, quantity)}
                        variant="contained"
                        color={(parseInt(props.data.quantity) > 0) ? 'success' : 'error'} size="medium"
                        sx={{
                            '& ': {
                                fontFamily: 'Rubik',
                                fontSize: '13px'
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#c62828',
                                color: '#FFF',
                                opacity: 0.9
                            }
                        }}
                    >{(parseInt(props.data.quantity) > 0) ? <> Comprar(R${(props.data.value * quantity)})</> : 'Esgotado'}</Button>
                </Stack>
            </Stack>
        </Grid2>);
}

export default BoxProdutos;