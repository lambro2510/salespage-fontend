import React, { useState, useEffect } from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import ProductService from '../../../../service/ProductService';
import SellerStoreService from '../../../../service/StoreService';

import { useDispatch } from 'react-redux';
import { setProductType } from '../../../../redux/typeSlider';
import { setSellerStore } from '../../../../redux/storeSlider';
const { Option } = Select;

const SearchProductInput = ({ productFilter, setProductFilter, handleSearch }) => {
    const dispatch = useDispatch();
    const [productTypes, setProductTypes] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const types = await getProductType();
        const stores = await getSellerStore();
        types.unshift({ productType: '', typeName: 'Tất cả' })
        setStores(stores);
        setProductTypes(types);
        dispatch(setProductType(types))
        dispatch(setSellerStore(stores))
    };

    const getProductType = async () => {
        const response = await ProductService.getProductType();
        return response;
    }

    const getSellerStore = async () => {
        const response = await SellerStoreService.getSellerStore();
        return response.data;
    }



    const handleInputChange = (fieldName, value) => {
        if (fieldName === 'productType') {
            const selectedType = productTypes.find((type) => type.typeName === value);
            setProductFilter({
                ...productFilter,
                [fieldName]: selectedType?.productType || '',
                typeName: value,
            });
        } else {
            setProductFilter({ ...productFilter, [fieldName]: value });
        }
    };


    const handleSoldDateChange = (date) => {
        handleInputChange('soldDate', date);
    };

    const handleSearchClick = () => {
        handleSearch();
    };

    return (
        <div style={{ width: '96%', padding : '22px 10px', margin: 'auto' }}>
            <Row gutter={[16, 16]} flex='1'>
                <Col span={6}>
                    <Input value={productFilter.productName} onChange={(e) => handleInputChange('productName', e.target.value)} placeholder="Tên sản phẩm" />
                </Col>
                <Col >
                    <Select value={productFilter.typeName} onChange={(value) => handleInputChange('productType', value)} placeholder="Loại sản phẩm">
                        {productTypes?.map((type) => (
                            <Option key={type?.productType} value={type?.typeName}>
                                {type?.typeName}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col >
                    <Select value={productFilter.storeName} onChange={(value) => handleInputChange('storeName', value)} placeholder="Store name">
                        {stores?.map((store) => (
                            <Option key={store?.storeId} value={store?.storeName}>
                                {store?.storeName}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col >
                    <Input value={productFilter.minPrice} onChange={(e) => handleInputChange('minPrice', e.target.value)} placeholder="Min price" type="number" />
                </Col>
                <Col>
                    <Input value={productFilter.maxPrice} onChange={(e) => handleInputChange('maxPrice', e.target.value)} placeholder="Max price" type="number" />
                </Col>
                <Col >
                    <DatePicker value={productFilter.soldDate} onChange={handleSoldDateChange} placeholder="Sold date" />
                </Col>
                <Col >
                    <Button onClick={handleSearchClick}>Search</Button>
                </Col>
            </Row>
        </div>
    );
};

export default SearchProductInput;