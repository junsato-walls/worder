import * as React from 'react';
// import { useState, useEffect } from "react";

//グリッドで分けている部分
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// import MenuCard from './MenuCard';

//カード部分
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function menu() {
 const img = require('./curry.jpg')
    
  return (
    <>
       <Grid item xs={6} sm={6} md={3} lg={3}>
            <Item>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      カレー
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      説明文：テストテストテスト
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
        </Grid>
    </>
  )
}
export default menu;