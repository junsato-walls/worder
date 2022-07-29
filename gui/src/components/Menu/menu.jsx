import * as React from 'react';
import { useState, useEffect } from "react";
import MenuTab from './MenuTab';
import OrdersHistory from './orders_history';
import axios from "axios";
//グリッドで分けている部分
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

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
  const baseURL = "http://"+process.env.REACT_APP_IP_PORT;
  const [categoryData, setCategoryData] = useState([])
  const [value, setValue] = useState(0);
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    GetCategory()
    GetOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <OrdersHistory />
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