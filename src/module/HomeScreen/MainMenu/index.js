import * as React from 'react';
import { Row, Col } from 'antd';
import TopMenu from './TopMenu';
import './style.scss';
import SearchMenu from './SearchMenu';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <Row justify="center">
                <Col span={18}>
                    <TopMenu> </TopMenu>
                    <SearchMenu></SearchMenu>
                </Col>
            </Row>
        </div>
    )
}

export default MainMenu;