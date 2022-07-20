import * as React from 'react';
import { useState, useEffect } from "react";
import Menus from './MenuCard';
import axios from "axios";
import { useLocation, } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

//modal
import Box from '@mui/material/Box';
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
    width: 720,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MenuTab(props) {
    const { category_id } = props;
    const baseURL = "http://127.0.0.1:8000";
    const search = useLocation().search;
    const [menuData, setMenuData] = useState([]);
    const [seat, setSeat] = useState('');
    const [orderData, setOrderData] = useState([]);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const query = new URLSearchParams(search);
        setSeat(query.get('seat_id'))
        GetMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const GetMenu = () => {
        axios.get(baseURL + '/menus/' + category_id).then(res => {
            setMenuData(res.data)
        })
    }

    const handleOpen = () => {
        axios.get(baseURL + '/orders_history/' + seat).then(res => {
            if (res.status === 200) {
                setOrderData(res.data)
                console.log(res.data)
            }
        })
        setOpen(true)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    {menuData.map(menu =>
                        <Menus menu={menu}
                            seat={seat}
                        />
                    )}
                </Grid>
            </Box>
            <div>
                <Fab variant="extended">
                    <NavigationIcon sx={{ mr: 1 }} />
                    <Button onClick={handleOpen}>注文履歴</Button>
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
                                                    <TableCell>{SelectOrderData.price}円</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell align="center">合計</TableCell>
                                                <TableCell align="">{TotalPrice}円</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Container>
                        </Box>
                    </Modal>
                </Fab>
            </div>
            <div>hoge: {seat}</div>
        </>
    )
}
export default MenuTab;