import React from "react";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { Stack } from "@mui/material";
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

export const categoriasLoad = [];

for (let i = 1; i < 5; i++) {
    categoriasLoad.push(<Grid2 xs={12} sm={3} md={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" className="product-card">
            <Stack direction="row" alignItems="center" spacing={1}>
                <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ bgcolor: 'white' }} />
                <div>
                    <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}><Skeleton sx={{ bgcolor: 'white' }} width={80} /></div>
                    <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px' }}><Skeleton sx={{ bgcolor: 'white' }} width={50} /></div>
                </div>
            </Stack>
            
        </Stack>
    </Grid2>
    );
}

const BoxCategorias = (props) => {
    const svg = new Blob([props.data.icon], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);

    return (
        <Grid2 xs={12} sm={3} md={3} onClick={() => props.setPage(props.data.id)}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" className={(props.active ? 'product-card active' : 'product-card')}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ bgcolor: props.data.color }}><img src={url} /></Avatar>
                    <div>
                        <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}>{props.data.name}</div>
                        <div style={{ color: '#D9D9D9', fontSize: '14px', lineHeight: '16px' }}>{props.data.total_products} cheats</div>
                    </div>
                </Stack>
            </Stack>
        </Grid2>);
}

export default BoxCategorias;