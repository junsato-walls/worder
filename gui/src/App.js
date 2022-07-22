import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/menu';
import Order from './components/Order/order';
import Bill from './components/Bill/bill';
import AdminAddMenu from './components/Admin/add_menu';
import AdminAddCategories from './components/Admin/add_categories';
import AdminAddSeat from './components/Admin/add_seat';
import NoMatch from './components/nomatch';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/add_menu" element={<AdminAddMenu />} />
          <Route path="/add_categories" element={<AdminAddCategories />} />
          <Route path="/add_seat" element={<AdminAddSeat />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </div>
  );
}

export default App;
