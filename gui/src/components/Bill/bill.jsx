import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
//select box
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Contact() {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [orderData, setOrderData] = useState([])
  const [selectButton, setSelectButton] = useState(null)
  const [SeatsData, setSeatsData] = useState([])
  const [selectSeat, setSelectSeat] = useState('');
  const [TotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectButton != null) {
      axios.post(baseURL + '/orders?id=' + orderData[selectButton.id].id + '&order_st=' + selectButton.st).then(res => {
        console.log(res.status)
        if (res.status === 200) {
          GetOrder()
        }
      })
    }
    GetOrder()
    GetSeats()
    // ↓ Warningを消すために実装のため消さないこと
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectButton])

  //シート番号採番
  useEffect(() => {
    if (selectSeat != null) {
      axios.get(baseURL + '/orders_Provided/' + selectSeat).then(res => {
        if (res.status === 200) {
          setOrderData(res.data)
          console.log(res.data)
        }
      })
    }
  }, [selectSeat])

  //合計計算
  useEffect(() => {
    if (orderData != null) {
      let price = 0
      orderData.map((order) => (
        price = price + order.price
      ))
      setTotalPrice(price)
    }
  }, [orderData])

  //オーダー情報取得
  const GetOrder = () => {
    axios.get(baseURL + '/orders_Provided').then(res => {
      setOrderData(res.data)
      console.log(res.data)
    })
  }

  //席番号取得
  const GetSeats = () => {
    axios.get(baseURL + '/seats').then(res => {
      setSeatsData(res.data)
      console.log(res.data)
    })
  }

  const BillComplete = () => {
    axios.post(baseURL + '/order_bill?seat_id=' + selectSeat + '&bill_st=1').then(res => {
      console.log(res.status)
      if (res.status === 200) {
        console.log('ステータス:200')
        alert('会計が完了しました');
        setSelectButton(null)
        GetOrder()
      }
    })
  }

  //セレクトボックス変更時、席番号取得
  const handleChange = (event) => {
    setSelectSeat(event.target.value);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <h2>会計画面</h2>
        <Box sx={{ minWidth: 120, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">席番号</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectSeat}
              label="席番号"
              onChange={handleChange}
            >
              {SeatsData.map(seats =>
                <MenuItem value={seats.id}>{seats.seat}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="">注文品名</TableCell>
                <TableCell align="">金額</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((SelectOrderData) => (
                <TableRow>
                  <TableCell>{SelectOrderData.menu}</TableCell>
                  <TableCell>{SelectOrderData.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center">合計</TableCell>
                <TableCell align="">{TotalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div margin align="right"><Button variant="contained" endIcon={<SendIcon />} onClick={BillComplete}>会計</Button></div>
      </Container>

    </>
  )
}

export default Contact;