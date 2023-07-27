import { Menu, Layout, Tooltip } from 'antd';
import {
    UserOutlined,
    ShoppingOutlined,
    ShopOutlined,
    TagsOutlined,
    FileDoneOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import logo from '../../../assert/logo.png';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

const MainMenu = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo-vertical">
                <img src={logo} alt="logo" className="main-icon" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <SubMenu key="sub1" icon={<FileDoneOutlined />} title="Thống kê">
                    <Menu.Item key="1">
                        <Tooltip title="Xem thông tin người dùng">
                            Người dùng
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Tooltip title="Xem thông tin sản phẩm">
                            Sản phẩm
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Tooltip title="Xem thông tin cửa hàng">
                            Cửa hàng
                        </Tooltip>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TagsOutlined />} title="Sản phẩm">
                    <Menu.Item key="4" onClick={() => navigate('product')}>
                        <Tooltip title="Xem kho sản phẩm">
                            Kho sản phẩm
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => navigate('product-category')}>
                        <Tooltip title="Danh mục sản phẩm">
                            Danh mục sản phẩm
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Tooltip title="Xem sản phẩm giảm giá">
                            Sản phẩm giảm giá
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Tooltip title="Xem khách hàng mua sản phẩm">
                            Khách hàng mua sản phẩm
                        </Tooltip>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<ShopOutlined />} title="Cửa hàng">
                    <Menu.Item key="7">
                        <Tooltip title="Xem danh sách cửa hàng">
                            Danh sách cửa hàng
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Tooltip title="Xem sản phẩm giảm giá của cửa hàng">
                            Sản phẩm giảm giá
                        </Tooltip>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<TagsOutlined />} title="Mã giảm giá">
                    <Menu.Item key="9">
                        <Tooltip title="Xem kho mã giảm giá">
                            Kho mã giảm giá
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Tooltip title="Xem người dùng sử dụng mã giảm giá">
                            Người dùng mã giảm giá
                        </Tooltip>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<AppstoreAddOutlined />} title="Đơn hàng người dùng">
                    <Menu.Item key="11">
                        <Tooltip title="Xem đơn hàng đang diễn ra">
                            Đơn hàng đang diễn ra
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Tooltip title="Xem lịch sử bán hàng">
                            Lịch sử bán hàng
                        </Tooltip>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
};

export default MainMenu;
