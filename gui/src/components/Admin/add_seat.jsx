import * as React from 'react';
import Header from '../Common/header';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function AddSeats() {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [seat, setSeat] = useState('')
  const [SeatsData, setSeatsData] = useState([])

  useEffect(() => {
    GetSeats()
  },[])

  //登録ボタン動作
  const InsertCategory = () => {
    axios.put(baseURL + '/seats?seat=' + seat).then(res => {
      if (res.status === 200) {
        console.log('ステータス:200')
      }
    })
  }

  //カテゴリデータ取得
  const GetSeats = () => {
    axios.get(baseURL + '/seats').then(res => {
      setSeatsData(res.data)
      console.log(res.data)
    })
  }

  return (
    <>
      <Header />
      <h2>席番号追加 </h2>
      <div><TextField id="outlined-basic" label="シート番号" variant="outlined" onChange={(event) => setSeat(event.target.value)} /></div>
      <div><Button /></div>
      <div><Button variant="contained" endIcon={<SendIcon />} onClick={InsertCategory}>登録</Button></div>
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">シート番号</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SeatsData.map((SelectSeatsData) => (
                <TableRow>
                  <TableCell align="right">{SelectSeatsData.id}</TableCell>
                  <TableCell align="center">{SelectSeatsData.seat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </>
  )
}

export default AddSeats;