import * as React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Button, Select, Spin, Carousel, Image, Upload, Popover, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ProductService from '../../../../service/ProductService';
import './style.scss'
const { TextArea } = Input;
const { Option } = Select;

const SellerProductModal = ({ id, visible, setVisible, setUpdate }) => {
    const [isLoading, setIsloading] = React.useState(false);
    const [isResettingImage, setIsResettingImage] = React.useState(false);
    const [fileList, setFileList] = React.useState([]);
    const [deleteImages, setDeleteImages] = React.useState([])
    const [product, setProduct] = React.useState({});
    const [productTypes, setProductTypes] = React.useState([]);
    const [sellerStores, setSellerStores] = React.useState([])
    const stores = useSelector((state) => state.store.sellerStore);
    const types = useSelector((state) => state.type.productType);

    React.useEffect(() => {
        setIsloading(false)
        setProductTypes(types);
        setSellerStores(stores);
        setFileList([])
        setIsResettingImage(false)
        if (id) {
            fetchData();
        }
    }, [id])

    React.useEffect(() => {
        setIsloading(false)
    })

    const getProductDetail = async () => {
        const response = await ProductService.getProductDetail(id)
        return response;
    }

    const fetchData = async () => {
        const response = await getProductDetail();
        setProduct(response)

    }
    const handleCancel = () => {
        setVisible(false);
    };

    const saveProduct = async () => {
        const response = await ProductService.updateProduct(product);
        return response;
    }
    const handleSave = () => {
        setIsloading(false)
        saveProduct();
        setUpdate();
        setIsloading(true);
        setVisible(false);
    };

    const handleUpload = async () => {
        setIsloading(true);
        const formData = new FormData();

        fileList.forEach(file => {
            formData.append('files', file);
        });

        const response = await ProductService.uploadProductImage(
            product?.productId,
            formData
        );
    }

    const handleRemove = (file) => {
        setFileList(fileList.filter(f => f !== file));
    };

    const handleBeforeUpload = (file) => {
        setFileList([...fileList, file]);
        return false;
    };

    const handleDeleteImage =  async (imageUrl) => {
        
        setIsloading(true)
        const imageUrls = [...deleteImages, imageUrl];
        console.log(imageUrls);
        const response = await ProductService.deleteProductImages(product?.productId, imageUrls);
        setIsloading(false)
    }

    const deleteImage = (imageUrl) => {

    }

    const handleResetImage = () => {
        setIsResettingImage(true);
    };

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
        console.log(selectedStore);
        setProduct({
            ...product,
            storeId: selectedStore.storeId,
        });
    };

    const renderImage = (imageUrl) => {
        return (
            <div className='select-image-container'>
                {!isResettingImage && (<DeleteOutlined onClick={() => handleDeleteImage(imageUrl)} />)}
                {isResettingImage && (
                    <>
                        <Button className='btn-default' onClick={() => {
                            setProduct({ ...product, imageUrl: imageUrl });
                            setIsResettingImage(false);
                        }}>Chọn làm ảnh chính</Button>
                        <Button className='btn-default' onClick={() => {
                            setIsResettingImage(false);
                        }}>Hủy bỏ</Button>
                    </>

                )}
                <div
                    key={imageUrl}
                    className='image-container'
                >
                    <Image
                        src={imageUrl}
                        preview={false}
                        className='image'
                    />
                </div>
            </div>
        );
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
                    <Carousel slidesToShow={3} style={{ width: '100%' }}>
                        {product?.imageUrls?.map((imageUrl) => (
                            renderImage(imageUrl)
                        ))}
                    </Carousel>
                    <Upload
                        fileList={fileList}
                        beforeUpload={handleBeforeUpload}
                        onRemove={handleRemove}
                    >
                        <Button>Chọn ảnh</Button>
                    </Upload>
                    <Button onClick={handleUpload}>Tải lên</Button>

                    <Button>Xóa các ảnh đã chọn</Button>

                </Form.Item>


                <Form.Item label="Ảnh hiển thị">
                    <Image src={product?.imageUrl} preview={false} />
                    <Button onClick={handleResetImage}>Thiết lập lại ảnh hiển thị</Button>
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
            <Spin spinning={isLoading}>
                {renderProductForm()}
            </Spin>
        </Modal>

    );
};

export default SellerProductModal;