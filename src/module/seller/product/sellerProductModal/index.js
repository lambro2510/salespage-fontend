import * as React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Option } = Select;

const SellerProductModal = ({ product, visible, setVisible }) => {
    const [editedProduct, setEditedProduct] = React.useState({ ...product });
    const [productTypes, setProductTypes] = React.useState([]);
    const stores = useSelector((state) => state.store.sellerStore);
    const types = useSelector((state) => state.type.productType);
    React.useEffect(() => {
        setProductTypes(types);
        setEditedProduct({ ...product });
    }, [product])
    const handleCancel = () => {
        setVisible(false);
    };

    const handleSave = () => {
        onSave(editedProduct);
        setVisible(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSelectChange = (value) => {
        setEditedProduct({
            ...editedProduct,
            type: value,
        });
    };

    const onSave = () => {
        console.log(editedProduct);
    };

    return (
        <Modal
            title="Edit Product"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item label="Product Name">
                    <Input
                        name="productName"
                        value={editedProduct.productName}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Product Price">
                    <Input
                        type="number"
                        name="productPrice"
                        value={editedProduct.productPrice}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Product Type">
                    <Select
                        name="type"
                        value={productTypes?.filter(item => item?.productType === editedProduct.type)[0]?.typeName}
                        onChange={handleSelectChange}
                    >
                        {productTypes?.map((type) => (
                            <Option key={type?.productType} value={type?.typeName}>
                                {type?.typeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Product Description">
                    <TextArea
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Selling Address">
                    <Input
                        name="sellingAddress"
                        value={editedProduct.sellingAddress}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Default Image URL">
                    <Input
                        name="imageUrl"
                        value={editedProduct.imageUrl}
                        onChange={handleChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SellerProductModal;