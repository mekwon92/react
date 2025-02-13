import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/common/Index';
import MainLayout from './component/layout/MainLayout';
import MyCart from './component/order/MyCart';
import MyOrder from './component/order/MyOrder';
import OrderSuccessed from './component/order/OrderSuccess';
import OrderFailed from './component/order/OrderFailed';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path='/cart' element={<MyCart />} />
          <Route path='/order' element={<MyOrder />} />
          <Route path='/order/success' element={<OrderSuccessed />} />
          <Route path='/order/fail' element={<OrderFailed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;