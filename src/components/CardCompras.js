import React from "react";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { Stack } from "@mui/material";

export const comprasLoad = [];

for (let i = 1; i < 10; i++) {
    comprasLoad.push(
        <div className="card-compras" key={i}>
            <div className="d-flex align-items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <Stack>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}><Skeleton width={100} /></div>
                    <div style={{ fontSize: '14px' }}><Skeleton width={150} /></div>
                </Stack>
            </div>
        </div>
    );
}

const CardCompras = (props) => {

    return (
        <div className="card-compras">
            <div className="d-flex align-items-center gap-3">
                <Avatar sx={{ bgcolor: '#15161B' }} ></Avatar>
                <Stack>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}>{props.data.email}</div>
                    <div style={{ fontSize: '14px' }}>Comprou {props.data.category_name} ({props.data.product_name} {props.data.amount}x)</div>
                </Stack>
            </div>
        </div>);
}

export default CardCompras;