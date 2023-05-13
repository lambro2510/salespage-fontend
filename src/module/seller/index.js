import React from 'react';
import { Row, Col, Space } from 'antd';
import SellerMenu from './sellerMenu';
import SellerDashboard from './dashboard';
import { useLogoutAndNavigate } from '../../utils';
function SellerHome() {
    return (
        <Row >
            <Col >
                <SellerMenu />
            </Col>
            <Col flex="1">
                <SellerDashboard />
            </Col>
        </Row>
    );
}

export default SellerHome;
