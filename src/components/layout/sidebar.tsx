import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import { UserOutlined, InfoCircleOutlined, ShoppingOutlined, BarcodeOutlined, ShopOutlined, OrderedListOutlined } from '@ant-design/icons';
import { MdProductionQuantityLimits } from 'react-icons/md';

export const sidebar = [
  {
    path: webRoutes.products,
    key: webRoutes.products,
    name: 'Sản phẩm',
    icon: <MdProductionQuantityLimits />,
  },
  {
    path: webRoutes.vouchers,
    key: webRoutes.vouchers,
    name: 'Khuyến mãi',
    icon: <BarcodeOutlined />,
  },
  {
    path: webRoutes.stores,
    key: webRoutes.stores,
    name: 'Liên hệ',
    icon: <ShopOutlined />,
  },
  {
    path: webRoutes.home,
    key: webRoutes.home,
    name: 'Giới thiệu',
    icon: <ShopOutlined />,
  }
];
