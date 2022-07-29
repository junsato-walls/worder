import * as React from 'react';

//グリッドで分けている部分
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//カード部分
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function menuCard(props) {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const { menu, seat } = props;
  const img = require('./img/' + menu.id + '.jpg')
  const createOrder = () => {
    if (seat !== '') {
      console.log(seat)
      axios.put(baseURL + '/orders?menu_id=' + menu.id
        + '&price=' + menu.price
        + '&seat_id=' + seat).then(res => {
          if (res.status === 200) {
            console.log(res.status)
            console.log('ステータス:200')
            alert('注文が完了しました。');
          }
        })
    }
  }
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
                  {menu.menu}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  金額：{menu.price}円
                  <div>
                    <Button variant="solid" onClick={createOrder}>注文</Button>
                  </div>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Item>
      </Grid>
    </>
  )
}
export default menuCard;
