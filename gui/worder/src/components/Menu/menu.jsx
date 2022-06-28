import * as React from 'react';
// import { useState, useEffect } from "react";

import Header from '../Common/header';
import Menus from './menuCard';

//グリッドで分けている部分
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
function menu() {
    
  return (
    <>
      <Header />
      <h2>Menu</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
        <Menus />
        </Grid>
      </Box>
    </>
  )
}
export default menu;