import * as React from 'react';
import { useState, useEffect } from "react";
import MenuTab from './MenuTab';
import axios from "axios";
import { useLocation, } from 'react-router-dom';

//グリッドで分けている部分
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              {categoryData.map((category, i) =>
                <Tab label={category.category} value={i} />
              )}
            </TabList>
          </Box>
          {categoryData.map((category, i) =>
            <TabPanel value={i}><MenuTab 
              category_id={category.id} 
               />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  )
}
export default Menu;