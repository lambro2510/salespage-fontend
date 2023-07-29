import React from 'react';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';

const {confirm} = Modal;

const ListImage = ({ url, fileList, setFileList, handleDelete, size }) => {

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const handleRemove = file => {
        confirm({
            title: 'Xác nhận xoá',
            content: 'Bạn có chắc muốn xoá ảnh này?',
            okText: 'Xoá',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(file?.url);
            },
        });
    };

    return (
        <ImgCrop rotate>
            <Upload
                action={url}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                onRemove={handleRemove} 
            >
                {fileList?.length < size && <PlusOutlined />}
            </Upload>
        </ImgCrop>
    );
};

export default ListImage;
