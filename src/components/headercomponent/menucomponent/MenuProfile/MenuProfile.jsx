import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../../../store/actions.js';
import { Menu } from "antd";
import { GlobalOutlined, BellOutlined, QuestionCircleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import translate from '../../../../language'
import { Link } from "react-router-dom";

const { SubMenu } = Menu;



function MenuProfile({ }) {
    const text = translate[useSelector(state => state.language)];
    const profile = translate[useSelector(state => state.profile)];
    const dispatch = useDispatch();

    const handleLanguageChange = (newLanguage) => {
        dispatch(setLanguage(newLanguage));
    }


    return (
        <Menu
            mode="horizontal"
            className="menu-container"
            style={{ backgroundColor: 'inherit', color: 'white', display: "flex" }}
        >
            <Menu.Item>
                <a href="">{text.seller_center}</a>
            </Menu.Item>
            <Menu.Item>
                <a href="">{text.join_seller}</a>
            </Menu.Item>
            <Menu.Item>
                <a href="">{text.download}</a>
            </Menu.Item>
            <SubMenu
                title={
                    <div className="menu-social-media-label">{text.follow_us}</div>
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
                <a href="">{text.notifications}</a>
            </Menu.Item>
            <Menu.Item>
                <QuestionCircleOutlined style={{ marginRight: 8 }} />
                <a href="">{text.help}</a>
            </Menu.Item>
            <SubMenu
                title={
                    <>
                        <GlobalOutlined style={{ marginRight: 8 }} />
                        {useSelector(state => state.language)}
                    </>
                }
            >
                <Menu.Item onClick={() => handleLanguageChange('English')}>English</Menu.Item>
                <Menu.Item onClick={() => handleLanguageChange('Vietnamese')}>Tiếng Việt</Menu.Item>
            </SubMenu>
            {
                typeof(profile.username) === undefined ? <>
                    <Menu.Item>
                        <Link to={'/registration'}>{text.sign_up}</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/login'}>{text.sign_in}</Link>
                    </Menu.Item>
                </> : <Menu.Item>
                        <Link to={'/profile'}>{profile.username}</Link>
                    </Menu.Item>
            }
        </Menu>
    )

}

export default MenuProfile
