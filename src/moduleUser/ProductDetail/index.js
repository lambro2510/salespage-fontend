import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import ProductService from '../../../service/ProductService';

const ProductScreen = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    getProductDetail(productId); 
  }, [productId]);

  const getProductDetail = async (productId) => {
    const productDetailData = await ProductService.getProductDetail(productId);
    setProductDetail(productDetailData);
  };

  return (
    <div>
      {productId}
    </div>
  );
};

export default ProductScreen;
