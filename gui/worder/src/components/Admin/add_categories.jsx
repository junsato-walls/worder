import * as React from 'react';
import Header from '../Common/header';

import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
import axios from "axios";
//select box
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddMenu() {
  const baseURL = "http://127.0.0.1:8000";
  const [menu, setMenu] = useState('')
  const [price, setPrice] = useState('')
  const [view_no, setView_no] = useState('')
  const [CategoryData, setCategoryData] = useState([])
  const [SelectCategoryID, setSelectCategoryID] = useState('');

  useEffect(() => {
    GetCategory()
    // ↓ Warningを消すために実装のため消さないこと
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  //   console.log('acceptedFiles:', acceptedFiles);
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  //セレクトボックス変更時、カテゴリ番号取得
  const handleChange = (event) => {
    setSelectCategoryID(event.target.value);
  };


  return (
    <>
      <Header />
      <h2>カテゴリ追加 </h2>
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
      <div><TextField id="outlined-basic" label="金額" variant="outlined" onChange={(event) => setPrice(event.target.value)} /></div>
      <div><TextField id="outlined-basic" label="順番" variant="outlined" onChange={(event) => setView_no(event.target.value)} /></div>
      <div><Button /></div>

      {/* <div {...getRootProps()} style={style}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>この画像を追加</p> :
            <p>ここに画像をドラッグ＆ドロップ</p>
        }
      </div> */}
      <div><Button variant="contained" endIcon={<SendIcon />} onClick={InsertMenu}>登録</Button></div>
    </>
  )
}

export default AddMenu;