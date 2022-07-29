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

function AddCategory() {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [category, setCategory] = useState('')
  const [CategoryData, setCategoryData] = useState([])

  useEffect(() => {
    GetCategory()
  }, [])

  //登録ボタン動作
  const InsertCategory = () => {
    axios.put(baseURL + '/categories?category=' + category).then(res => {
      if (res.status === 200) {
        console.log('ステータス:200')
      }
    })
  }

  //カテゴリデータ取得
  const GetCategory = () => {
    axios.get(baseURL + '/categories').then(res => {
      setCategoryData(res.data)
      console.log(res.data)
    })
  }

  return (
    <>
      <Header />
      <h2>カテゴリ追加 </h2>
      <div><TextField id="outlined-basic" label="カテゴリ名" variant="outlined" onChange={(event) => setCategory(event.target.value)} /></div>
      <div><Button /></div>
      <div><Button variant="contained" endIcon={<SendIcon />} onClick={InsertCategory}>登録</Button></div>
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">カテゴリ名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CategoryData.map((SelectOrderData) => (
                <TableRow>
                  <TableCell align="right">{SelectOrderData.id}</TableCell>
                  <TableCell align="center">{SelectOrderData.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default AddCategory;