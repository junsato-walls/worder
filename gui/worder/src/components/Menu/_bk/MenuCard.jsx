import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image from './curry.jpg'


function MenuCard() {
    <>
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
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
    </>
}

export default MenuCard