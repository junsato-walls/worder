import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MUIDataTable from "mui-datatables";
//select box
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';

function Contact() {
  const baseURL = "http://127.0.0.1:8000";
  const [orderData, setOrderData] = useState([])
  const [columns, setColumns] = useState()
  const [selectButton, setSelectButton] = useState(null)
  useEffect(() => {
    setColumns([{ label: 'テーブル', name: 'seat' },
    { label: 'メニュー', name: 'menu' },
    { label: '注文時間', name: 'created_at' },
    {
      label: '提供', name: 'id', options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <Button variant="solid" id={dataIndex} name='1' onClick={updateOrder}><ShoppingCartCheckoutIcon /></Button>
          );
        }
      }
    },
    {
      label: 'キャンセル', name: 'id', options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <Button variant="solid" id={dataIndex} name='2' onClick={updateOrder}><DeleteIcon /></Button>
          );
        }
      }
    }
    ])
    GetOrder()
  }, [])



  useEffect(() => {
    if (selectButton != null) {
      axios.post(baseURL + '/orders?id=' + orderData[selectButton.id].id + '&order_st=' + selectButton.st).then(res => {
        console.log(res.status)
        if (res.status == 200) {
          GetOrder()
        }
      })
    }
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

  const testdataUpdate =() =>{
      axios.post(baseURL + '/orders?id=1&order_st=0').then(res =>{
      })
      axios.post(baseURL + '/orders?id=2&order_st=0').then(res =>{
      })
      axios.post(baseURL + '/orders?id=3&order_st=0').then(res =>{
      })
      axios.post(baseURL + '/orders?id=4&order_st=0').then(res =>{
      })
      GetOrder()
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const options = {
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: false,
    pagination: false
  }

  return (
    <>
      <Header />
      <div><Button variant="solid" onClick={testdataUpdate}>更新</Button></div>
            <Container maxWidth="md">
        <Box sx={{ minWidth: 120, maxWidth:200}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl>
        </Box>
      </Container>
      <Container maxWidth="md">
      <MUIDataTable
        title=""
        data={orderData}
        columns={columns}
        options={options}
      />
      </Container>
    </>
  )
}

export default Contact;