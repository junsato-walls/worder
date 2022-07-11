import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/menu';
import Order from './components/Order/order';
import Bill from './components/Bill/bill';
import Admin_Add_Menu from './components/Admin/add_menu';
import Admin_Add_Categories from './components/Admin/add_categories';
import NoMatch from './components/nomatch';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/add_menu" element={<Admin_Add_Menu/>} />
          <Route path="/add_category" element={<Admin_Add_Categories/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </div>
  );
}


export default App;
