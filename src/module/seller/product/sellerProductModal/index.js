import * as React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Button, Select, Spin,Image} from 'antd';
import { useSelector } from 'react-redux';
import ProductService from '../../../../service/ProductService';
import './style.scss'
import ListImage from '../../../../component/listImage';
const { TextArea } = Input;
const { Option } = Select;

const SellerProductModal = ({ id, visible, setVisible, setUpdate }) => {
    const [isLoading, setIsloading] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [productTypes, setProductTypes] = React.useState([]);
    const [sellerStores, setSellerStores] = React.useState([]);
    const [uploadSuccessImage, setUploadSuccessImage] = React.useState([]);
    const stores = useSelector((state) => state.store.sellerStore);
    const types = useSelector((state) => state.type.productType);

    React.useEffect(() => {
        
        setProductTypes(types);
        setSellerStores(stores);
        if (id) {
            fetchData();
        }
    }, [id])

    React.useEffect(() => {
        setTimeout(() => {
            setIsloading(false);
        }, 60000)
        
    },[isLoading])

    const getProductDetail = async () => {
        const response = await ProductService.getProductDetail(id)
        return response;
    }

    const fetchData = async () => {
        setIsloading(true)
        const response = await getProductDetail();
        setProduct(response)
        setIsloading(false)

    }
    const handleCancel = () => {
        setVisible(false);
    };

    const saveProduct = async () => {
        const response = await ProductService.updateProduct(product);
        return response;
    }
    const handleSave = () => {
        setIsloading(true)
        saveProduct();
        setUpdate();
        setVisible(false);
        setIsloading(false)
    };

    const handleUpload = async (files) => {
        setIsloading(true)
        const response = await ProductService.uploadProductImage(
            product?.productId,
            files
        );
        setUpdate()
        setUploadSuccessImage(response)
        setIsloading(false)
    }

    const handleDeleteImage =  async (imageUrl) => {
        setIsloading(true)
        const response = await ProductService.deleteProductImages(product?.productId, imageUrl);
        setUpdate();
        setIsloading(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSelectTypeChange = (value) => {
        const selectedType = productTypes?.filter(item => item?.typeName === value)[0];
        setProduct({
            ...product,
            type: selectedType.productType,
        });
    };


    const handleSelectStoreChange = (value) => {
        const selectedStore = sellerStores?.filter(item => item?.storeName === value)[0];
        setProduct({
            ...product,
            storeId: selectedStore.storeId,
        });
    };

    const renderProductForm = () => {
        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} >
                <Form.Item label="Tên sản phẩm">
                    <Input
                        name="productName"
                        value={product?.productName}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Giá tiền">
                    <Input
                        type="number"
                        name="productPrice"
                        value={product?.productPrice}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Cửa hàng">
                    <Select
                        name="storeId"
                        value={sellerStores?.filter(item => item?.storeId === product?.storeId)[0]?.storeName}
                        onChange={handleSelectStoreChange}
                    >
                        {sellerStores?.map((store) => (
                            <Option key={store?.storeId} value={store?.storeName}>
                                {store?.storeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Loại sản phẩm">
                    <Select
                        name="type"
                        value={productTypes?.filter(item => item?.productType === product?.type)[0]?.typeName}
                        onChange={handleSelectTypeChange}
                    >
                        {productTypes?.map((type) => (
                            <Option key={type?.productType} value={type?.typeName}>
                                {type?.typeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm">
                    <TextArea
                        name="description"
                        value={product?.description}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Địa chỉ mua sản phẩm">
                    <Input
                        name="sellingAddress"
                        value={product?.sellingAddress}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Danh sách ảnh">
                    <ListImage imageUrls={product?.imageUrls} upload={handleUpload} size={10} handleDelete={handleDeleteImage} uploadSuccessImage={uploadSuccessImage}/>
                </Form.Item>


                <Form.Item label="Ảnh hiển thị">
                    <Image src={product?.imageUrl} preview={false} />
                    <Button onClick={{}}>Thiết lập lại ảnh hiển thị</Button>
                </Form.Item>
            </Form>
        );
    };

    return (
        <Modal
            title="Sửa thông tin sản phẩm"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="canel" onClick={handleCancel}>
                    Hủy bỏ
                </Button>,
                <Button key="submutt" type="primary" onClick={handleSave}>
                    Cập nhật
                </Button>,

            ]}
            width={'80vw'}
        >
            <Spin spinning={isLoading} size='large'>
                {renderProductForm()}
            </Spin>
        </Modal>

    );
};

export default SellerProductModal;