import React from "react";
import './SearchMenu.css'
import { Input } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons'
function SearchMenu() {
    return (
        <div className="search-menu">
            <img src={require("../../../../asserts/Main-Logo.png")} alt="logo" className="logo" />
            <div className="search-input">
                <Input.Search className="search-input-data" placeholder="Search" />
                <div className="sub-menu">
                    <a href="">Túi xách nữ</a>
                    <a href="">Áo khoác</a>
                    <a href="">Dép</a>
                    <a href="">Áo Croptop</a>
                    <a href="">Giày</a>
                    <a href="">Áo khoác nam</a>
                    <a href="">Áo thun</a>
                    <a href="">Giày nam</a>
                </div>
            </div>
            <ShoppingCartOutlined className="shopping-cart-icon" />
        </div>
    )
}

export default SearchMenu
