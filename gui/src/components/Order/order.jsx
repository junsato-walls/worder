import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';

//Button
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function About() {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [orderData, setOrderData] = useState([])
  const [selectButton, setSelectButton] = useState(null)

   useEffect(() => {
    if (selectButton != null) {
      console.log(selectButton.id)
      console.log(selectButton.st)
      axios.post(baseURL + '/orders?id=' + selectButton.id + '&order_st=' + selectButton.st).then(res => {
        console.log(res.status)
        if (res.status === 200) {
          GetOrder()
        }
      })
    }
    GetOrder()
    // ↓ Warningを消すために実装のため消さないこと
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectButton])

  const GetOrder = () => {
    axios.get(baseURL + '/orders').then(res => {
      setOrderData(res.data)
      console.log(res.data)
      console.log(orderData)

    })
  }

  const updateOrder = (e) => {
    console.log(e.currentTarget.id)
    setSelectButton({ id: e.currentTarget.id, st: e.currentTarget.name })
  }

  return (
    <>
      <Header />
      <Container maxWidth="md">
      <h2>オーダー管理画面</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="">テーブル</TableCell>
                <TableCell align="">注文品名</TableCell>
                <TableCell align="">注文時間</TableCell>
                <TableCell align="center">提供</TableCell>
                <TableCell align="center">キャンセル</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((SelectOrderData) => (
                <TableRow>
                  <TableCell>{SelectOrderData.seat}</TableCell>
                  <TableCell>{SelectOrderData.menu}</TableCell>
                  <TableCell>{SelectOrderData.created_at}</TableCell>
                  <TableCell align="center">
                    <Button variant="solid" id={SelectOrderData.id} name='1' onClick={updateOrder}><ShoppingCartCheckoutIcon /></Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="solid" id={SelectOrderData.id} name='2' onClick={updateOrder}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </>
  )
}

export default About;