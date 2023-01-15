import React from "react";
import './SearchMenu.css'
import { Input } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import translate from '../../../../language';
function SearchMenu() {

    const language = useSelector(state => state.language);
    
    return (
        <div className="search-menu">
            <img src={require("../../../../asserts/Main-Logo.png")} alt="logo" className="logo" />
            <div className="search-input">
                <Input.Search className="search-input-data" placeholder={translate[language].search} />
                <div className="sub-menu">
                    <a href="">{translate[language].female_bag}</a>
                    <a href="">{translate[language].jacket}</a>
                    <a href="">{translate[language].shoes}</a>
                    <a href="">{translate[language].croptop}</a>
                    <a href="">{translate[language].shoes}</a>
                    <a href="">{translate[language].male_jacket}</a>
                    <a href="">{translate[language].t_shirt}</a>
                    <a href="">{translate[language].male_shoes}</a>
                </div>
            </div>
            <ShoppingCartOutlined className="shopping-cart-icon" />
        </div>
    )
}

export default SearchMenu
