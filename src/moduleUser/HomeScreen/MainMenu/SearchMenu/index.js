import * as React from 'react';
import ProductService from '../../../../service/ProductService';
import './style.scss';
import { Row, Col, Dropdown, Input, Menu } from 'antd';
import logo from '../../../../assert/logo.png';
import { ShoppingCartOutlined } from '@ant-design/icons';

const SearchMenu = () => {
    const [products, setProducts] = React.useState([]);
    const [productFilter, setProductFilter] = React.useState('');
    const [productTypes, setProductTypes] = React.useState([])

    React.useEffect(() => {
        getProductType();
    }, []);

    const getProductType = async () => {
        const productTypeResponse = await ProductService.getProductType();
        setProductTypes(productTypeResponse);
    }

    const getProduct = async (productName) => {
        let size = 10;
        const productData = await ProductService.findProduct({ productName: productName, size: size });
        setProducts(productData?.data);
    };

    const handleInputChange = (e) => {
        setProductFilter(e.target.value);
        getProduct(e.target.value)
    };

    const SearchProductMenu = (
        <Menu>
            {products.length === 0 ? null :
                products.map((product) => (
                    <Menu.Item key={product?.productId}>
                        {product?.productName}
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    return (
        <Row justify="space-around">
            <Col span={2}>
                <img src={logo} alt="logo" className='main-icon' />
            </Col>
            <Col justify="space-evenly" className='seacch-product-menu' span={20}>
                <Row >
                    <Dropdown
                        overlay={SearchProductMenu}
                        trigger={['click']}
                    >
                        <Input
                            onChange={handleInputChange}
                            value={productFilter}
                            placeholder="Tìm kiếm sản phẩm"
                        />
                    </Dropdown>
                </Row>
                <Row justify="space-around">
                    {
                        productTypes.length === 0 ? null :
                            productTypes.map((productType) => (
                                <Col>
                                    <p className='hover-text'>{productType?.typeName}</p>
                                </Col>
                            ))
                    }
                </Row>
            </Col>
            <Col span={2} justify="center">
                <Row justify="center"><ShoppingCartOutlined /></Row>
            </Col>
        </Row>
    );
};

export default SearchMenu;
