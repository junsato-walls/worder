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
  const search = useLocation().search;
  const [categoryData, setCategoryData] = useState([])
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    GetCategory()
  }, [])

  const GetCategory = () => {
    axios.get(baseURL + '/categories').then(res => {
      setCategoryData(res.data)
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

          </Tabs>
        </Box>
        {categoryData.map((category, i) =>
          <TabPanel value={value} index={i}>
            <MenuTab category_id={category.id}/>
          </TabPanel>
        )}
      </Box>
    </>
  )
}
export default Menu;