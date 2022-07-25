import * as React from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';

const drawerWidth = 240;

function ClippedDrawer() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Worder管理画面
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <Typography variant="subtitle1" align="">お客様管理メニュー</Typography>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/order">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="オーダー確認" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/bill">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CurrencyYenIcon />
                  </ListItemIcon>
                  <ListItemText primary="会計確認" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Box>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <Typography variant="subtitle1" align="">各種追加メニュー</Typography>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/add_menu">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="メニュー追加" />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/add_categories">
                <ListItemButton>
                  <ListItemText primary="カテゴリ追加" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/add_seat">
                <ListItemButton>
                  <ListItemText primary="席番号追加" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ClippedDrawer
