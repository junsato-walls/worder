import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
//import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MUIDataTable from "mui-datatables";

function About() {
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

  const options = {
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: false
  }

  return (
    <>
      <Header />
      <div><Button variant="solid" onClick={testdataUpdate}>更新</Button></div>
      <MUIDataTable
        title=""
        data={orderData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default About;