import React, { useState, useEffect } from "react";

import { Menu } from "antd";
import { DownOutlined, GlobalOutlined, BellOutlined, QuestionCircleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import text from '../../../../language'

const { SubMenu } = Menu;



function MenuProfile({ setIsLogin, language, setLanguage }) {

    return (
        <Menu
            mode="horizontal"
            className="menu-container"
            style={{ backgroundColor: 'inherit', color: 'white', display: "flex" }}
        >
            <Menu.Item>
                <a href="">{text[language].seller_center}</a>
            </Menu.Item>
            <Menu.Item>
                <a href="">{text[language].join_seller}</a>
            </Menu.Item>
            <Menu.Item>
                <a href="">{text[language].download}</a>
            </Menu.Item>
            <SubMenu
                title={
                    <div className="menu-social-media-label">{text[language].follow_us}</div>
                }
            >
                <Menu.Item icon={<FacebookOutlined style={{ color: 'blue' }} />}>
                    <a href="">Facebook</a>
                </Menu.Item>
                <Menu.Item icon={<TwitterOutlined style={{ color: 'blue' }} />}>
                    <a href="">Twitter</a>
                </Menu.Item>



            </SubMenu>
            <Menu.Item>
                <BellOutlined style={{ marginRight: 8 }} />
                <a href="">{text[language].notifications}</a>
            </Menu.Item>
            <Menu.Item>
                <QuestionCircleOutlined style={{ marginRight: 8 }} />
                <a href="">{text[language].help}</a>
            </Menu.Item>
            <SubMenu
                title={
                    <>
                        <GlobalOutlined style={{ marginRight: 8 }} />
                        {language}
                    </>
                }
            >
                <Menu.Item onClick={() => setLanguage('English')}>English</Menu.Item>
                <Menu.Item onClick={() => setLanguage('Vietnamese')}>Tiếng Việt</Menu.Item>
            </SubMenu>
            <Menu.Item>
                <a href="">{text[language].sign_in}</a>
            </Menu.Item>
            <Menu.Item onClick={() => setIsLogin(true)}>
                {text[language].login}
            </Menu.Item>
        </Menu>
    )

}

export default MenuProfile
