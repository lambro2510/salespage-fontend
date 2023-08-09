import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import ProductService from '../../../../service/seller/ProductService';
import ListImage from '../../../../component/ListImageComponent';
import { UPLOAD_PRODUCT_URL } from '../../../../constant';

const { Option } = Select;

const UpdateProductModal = ({ stores, productCategory, productId, visible, onClose, onUpdate }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const [files, setFiles] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    productId: productId,
    productName: '',
    description: '',
    categoryId: '',
    productPrice: 0,
    sellingAddress: '',
    storeId: '',
    imageUrls: []
  });

  const handleUpdateProduct = () => {
    onUpdate(updateProduct);
    // setUpdateProduct({
    //   productId: '',
    //   productName: '',
    //   description: '',
    //   categoryId: '',
    //   productPrice: 0,
    //   sellingAddress: '',
    //   storeId: '',
    //   imageUrls: []
    // });
  };

  useEffect(() => {
    if (productId) {
      getProductDetail();
      console.log(updateProduct);
    }
  }, [productId]);

  useEffect(() => {
    setUpdateProduct({
      ...updateProduct,
      storeId: stores[0]?.storeId,
      categoryId: productCategory[0]?.categoryId
    });
    console.log(updateProduct);
  }, [productCategory, stores]);

  const getProductDetail = async () => {
    const productData = await ProductService.getProductDetail(productId);
    setUpdateProduct(productData);
  };

  const handleUpdateImage = (image) => {
    setUpdateProduct({
      ...updateProduct,
      imageUrls: [...updateProduct?.imageUrls, image],
    });
  };

  const handleDeleteImage = async (file) => {
    setFileLoading(true);
    await ProductService.deleteProductImages(productId, file?.url);
    setFileLoading(false);
  };

  const handleUploadImage = async (file) => {
    return await ProductService.uploadProductImage(productId, file);
  };

  const updateDefaultImage = async (imageUrl) => {
    await ProductService.updateProductImage(productId, imageUrl);
  };

  return (
    <Modal
      title="Update Product"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateProduct}>
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Tên sản phẩm">
          <Input
            value={updateProduct?.productName}
            onChange={(e) => setUpdateProduct({ ...updateProduct, productName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            value={updateProduct?.description}
            onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Giá tiền">
          <Input
            value={updateProduct?.productPrice}
            onChange={(e) => setUpdateProduct({ ...updateProduct, productPrice: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ bán hàng">
          <Input
            value={updateProduct?.sellingAddress}
            onChange={(e) => setUpdateProduct({ ...updateProduct, sellingAddress: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Loại danh mục">
          <Select
            value={updateProduct?.categoryId}
            onChange={(value) => setUpdateProduct({ ...updateProduct, categoryId: value })}
          >
            {productCategory?.map((category) => (
              <Option key={category?.categoryId} value={category?.categoryId}>
                {category?.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Cửa hàng bán">
          <Select
            value={updateProduct?.storeId}
            onChange={(value) => setUpdateProduct({ ...updateProduct, storeId: value })}
          >
            {stores?.map((store) => (
              <Option key={store?.storeId} value={store?.storeId}>
                {store?.storeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Kho ảnh">
          <ListImage
            images={updateProduct?.imageUrls}
            setFileList={handleUpdateImage}
            url={`${UPLOAD_PRODUCT_URL}productId=${productId}`}
            size={10}
            handleDelete={handleDeleteImage}
            handleUpload={handleUploadImage}
            loading={fileLoading}
            handleUpdateImage={updateDefaultImage}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
