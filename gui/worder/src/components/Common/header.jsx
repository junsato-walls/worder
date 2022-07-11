import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <Link style={{ textDecoration: 'none',color:'white'}} to="/order">オーダー画面　</Link>
            <Link style={{ textDecoration: 'none',color:'white'}} to="/bill">会計画面　</Link>
            <Link style={{ textDecoration: 'none',color:'white'}} to="/add_menu">メニュー追加　</Link>
            <Link style={{ textDecoration: 'none',color:'white'}} to="/add_category">カテゴリ追加　</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}