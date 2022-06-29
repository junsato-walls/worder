import * as React from 'react';
import { useState, useEffect } from "react";
import Menus from './MenuCard';
import axios from "axios";
import { useLocation, } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function MenuTab(props) {
    const { category_id } = props;
    const baseURL = "http://127.0.0.1:8000";
    const search = useLocation().search;
    const [menuData, setMenuData] = useState([])
    const [seat, setSeat] = useState('')

    useEffect(() => {
        const query = new URLSearchParams(search);
        setSeat(query.get('seat_id'))
        GetMenu()
    }, [])

    const GetMenu = () => {
        axios.get(baseURL + '/menus/' + category_id).then(res => {
            setMenuData(res.data)
        })
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
        </>
    )
}
export default MenuTab;