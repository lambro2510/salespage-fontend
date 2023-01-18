import { Avatar, Image, Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import translate from "../../language";
export default function MainSider({ collapsed, setCollapsed }) {
    const text = translate[localStorage.getItem('language') || "English"]
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <div>
            <div className="logo"></div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['0']}
                items={[
                    {
                        key: '1',
                        icon: <>{
                            collapsed
                                ? <MenuUnfoldOutlined onClick={changeCollapsed} style={{ fontSize: "25px", marginRight: "10px", }} />
                                : <MenuFoldOutlined onClick={changeCollapsed} style={{ fontSize: "25px", paddingRight: "10px" }}
                                />
                        }</>
                    },
                    {
                        key: '2',
                        icon: <UserOutlined />,
                        label: text.profile,
                    },
                    {
                        key: '3',
                        icon: <ShoppingCartOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '4',
                        icon: <SettingOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </div>
    )
}