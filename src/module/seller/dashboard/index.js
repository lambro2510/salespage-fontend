import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerListProduct from '../product/sellerListProduct';
import StoreList from '../store/storeList';

const SellerDashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<SellerListProduct />} />
        <Route path="/store" element={<StoreList />} />
      </Routes>
    </div>
  );
}

export default SellerDashboard;
