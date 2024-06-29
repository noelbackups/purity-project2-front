import React, { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from "@mui/material";

export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <div className="logo"></div>
        <div className="navigation d-flex gap-2rem">
          <span className={(location.pathname === '/' || location.pathname === '/home') ? 'active' : null} onClick={() => navigate('/')}>Início</span>
          <span className={(location.pathname === '/store') ? 'active' : null} onClick={() => navigate('/store')}>Loja</span>
          <span className={(location.pathname === '/feedbacks') ? 'active' : null} onClick={() => navigate('/feedbacks')}>Avaliações</span>
          <span onClick={() => window.open('https://discord.gg/DFfnewp67K', '_blank')}>Discord</span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-1 col-md-4">
        <TextField
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              '& fieldset': {
                borderColor: '#FFF',
              },
              '&:hover fieldset': {
                borderColor: '#FFF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFF',
              },
              borderRadius: 10,
              color: '#FFF'
            },
            '& .MuiInputBase-input': {
              padding: ' 7px 7px'
            }
          }}
          valirant="outlined"
          placeholder="O que você está procurando?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#FFF", opacity: 0.6 }} />
              </InputAdornment>
            ),
          }}

        />
        <CircleNotificationsIcon sx={{ color: "#FFF", fontSize: 40 }} />
        <AccountCircleIcon sx={{ color: "#FFF", fontSize: 40 }} />
      </div>
    </div>
  )
}