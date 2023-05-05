import React from 'react';
import { Menu } from 'antd';
import './style.scss';

const { SubMenu } = Menu;

function ProductMenu() {
  const products = [
    {
      id: 1,
      name: 'Đồ ăn',
      subcategories: [
        { id: 1, name: 'Thực phẩm tươi sống' },
        { id: 2, name: 'Đồ uống' },
        { id: 3, name: 'Đồ khô' },
      ],
    },
    {
      id: 2,
      name: 'Đồ điện tử',
      subcategories: [
        { id: 4, name: 'Điện thoại' },
        { id: 5, name: 'Máy tính bảng' },
        { id: 6, name: 'Máy tính để bàn' },
      ],
    },
    {
      id: 3,
      name: 'Thời trang',
      subcategories: [
        { id: 7, name: 'Áo' },
        { id: 8, name: 'Quần' },
        { id: 9, name: 'Giày' },
      ],
    },
    {
      id: 4,
      name: 'Đồ gia dụng',
      subcategories: [
        { id: 10, name: 'Nồi cơm điện' },
        { id: 11, name: 'Máy lạnh' },
        { id: 12, name: 'Máy giặt' },
      ],
    },
    {
      id: 5,
      name: 'Sách',
      subcategories: [
        { id: 13, name: 'Văn học' },
        { id: 14, name: 'Kinh tế' },
        { id: 15, name: 'Khoa học' },
      ],
    },
    {
      id: 6,
      name: 'Mỹ phẩm',
      subcategories: [
        { id: 16, name: 'Chăm sóc da' },
        { id: 17, name: 'Trang điểm' },
        { id: 18, name: 'Chăm sóc tóc' },
      ],
    },
    {
      id: 7,
      name: 'Đồ chơi',
      subcategories: [
        { id: 19, name: 'Đồ chơi cho bé' },
        { id: 20, name: 'Đồ chơi điện tử' },
        { id: 21, name: 'Đồ chơi lắp ráp' },
      ],
    },
  ];

  return (
    <Menu mode="horizontal" className="product-menu">
      {products.map((product) => (
        <SubMenu key={product.id} title={product.name} className="product-submenu" >
          {product.subcategories.map((subcategory) => (
            <Menu.Item key={subcategory.id}>
              {subcategory.name}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default ProductMenu;
