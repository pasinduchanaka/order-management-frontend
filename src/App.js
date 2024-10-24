import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login'
import AddProduct from './components/product/AddProduct'    
import ViewProduct from './components/product/ViewProduct'    
import AddOrder from './components/order/AddOrder';
import ViewOrder from './components/order/ViewOrder';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/view-product' element={<ViewProduct/>}/>
          <Route path='/add-order' element={<AddOrder/>}/>
          <Route path='/view-order' element={<ViewOrder/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
