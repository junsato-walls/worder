import * as React from 'react';
import Header from '../Common/header';

import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Typography from '@mui/material/Typography';
//select box
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function AddMenu() {
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [menu, setMenu] = useState('')
  const [menuData, setMenuData] = useState([]);
  const [price, setPrice] = useState('')
  const [view_no, setView_no] = useState('')
  const [CategoryData, setCategoryData] = useState([])
  const [SelectCategoryID, setSelectCategoryID] = useState('');

  useEffect(() => {
    GetCategory()
    GetMenu()
    // ↓ Warningを消すために実装のため消さないこと
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //登録ボタン動作
  const InsertMenu = () => {
    console.log(menu)
    console.log(price)
    console.log(SelectCategoryID)
    axios.put(baseURL + '/menus?category_id=' + SelectCategoryID
      + '&menu=' + menu
      + '&price=' + price
      + '&view_no=' + view_no).then(res => {
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

  //メニューデータ取得
  const GetMenu = () => {
    axios.get(baseURL + '/menus').then(res => {
        setMenuData(res.data)
    })
}

  //セレクトボックス変更時、カテゴリ番号取得
  const handleChange = (event) => {
    setSelectCategoryID(event.target.value);
  };

  return (
    <>
      <Header />
      <h2>メニューの追加 </h2>
      <div align="center">
        <Box sx={{ minWidth: 120, maxWidth: 225 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">カテゴリ選択</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SelectCategoryID}
              label="カテゴリ選択"
              onChange={handleChange}
            >
              {CategoryData.map(category =>
                <MenuItem value={category.id}>{category.category}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div><TextField id="outlined-basic" label="メニュー名" variant="outlined" onChange={(event) => setMenu(event.target.value)} /></div>
      <div><TextField id="outlined-basic" label="価格" variant="outlined" onChange={(event) => setPrice(event.target.value)} /></div>
      <div><TextField id="outlined-basic" label="順番" variant="outlined" onChange={(event) => setView_no(event.target.value)} /></div>
      <div><Button /></div>
      <div><Button variant="contained" endIcon={<SendIcon />} onClick={InsertMenu}>登録</Button></div>
      <Container maxWidth="sm">
      <Typography variant="h6" align="">登録済みメニュー</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
              <TableCell align="center">メニュー名</TableCell>
                <TableCell align="center">価格</TableCell>
                <TableCell align="center">表示順番</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuData.map((SelectOrderData) => (
                <TableRow>
                  <TableCell align="center">{SelectOrderData.menu}</TableCell>
                  <TableCell align="center">{SelectOrderData.price}</TableCell>
                  <TableCell align="center">{SelectOrderData.view_no}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </>
  )
}

export default AddMenu;