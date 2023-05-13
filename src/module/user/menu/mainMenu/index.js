import * as React from 'react';
import { Menu } from 'antd';
import './style.scss';
import ProductService from '../../../../service/ProductService';
const { SubMenu } = Menu;

function ProductMenu() {
  
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await ProductService.getProductType();
    setProducts(response);
  };

  return (
    <Menu mode="horizontal" className="product-menu">
      {products.length > 0 ? (
        products.map((product) => (
          <SubMenu key={product?.productType} title={product?.typeName} className="product-submenu" >
          </SubMenu>
        ))
      ) : (
        <></>
      )}
    </Menu>
  );
}

export default ProductMenu;
