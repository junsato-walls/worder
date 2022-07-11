import * as React from 'react';
import { useState, useEffect } from "react";
import MenuTab from './MenuTab';
import axios from "axios";
import { useLocation, } from 'react-router-dom';

//グリッドで分けている部分
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

//modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Menu() {
  const baseURL = "http://127.0.0.1:8000";
  const [categoryData, setCategoryData] = useState([])
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [orderData, setOrderData] = useState([])
  const [selectButton, setSelectButton] = useState(null)
  const [SeatsData, setSeatsData] = useState([])
  const [selectSeat, setSelectSeat] = useState('');
  const [TotalPrice, setTotalPrice] = useState(0);
  const search = useLocation.search;
  const [seat, setSeat] = useState('')


  useEffect(() => {
    const query = new URLSearchParams(search);
    setSeat(query.get("seat_id"))
    console.log(seat)
    GetCategory()
    GetOrder()
  }, [])

  const GetCategory = () => {
    axios.get(baseURL + '/categories').then(res => {
      setCategoryData(res.data)

    })
  }

  const GetOrder = () => {
    axios.get(baseURL + '/orders_history/').then(res => {
      setOrderData(res.data)
      console.log(res.data)
      console.log(orderData)
    })
  }

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {categoryData.map((category, i) =>
              <Tab label={category.category} {...a11yProps(i)} />
            )}

            {/* <Button onClick={handleOpen}>注文履歴</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <Container maxWidth="lg">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 480 }} aria-label="spanning table">
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
                </Container>
              </Box>
            </Modal> */}
          </Tabs>
        </Box>
        {categoryData.map((category, i) =>
          <TabPanel value={value} index={i}>
            <MenuTab category_id={category.id} />
          </TabPanel>
        )}
      </Box>
    </>
  )
}
export default Menu;