import React, { useState, useEffect } from 'react';
import { Modal, Upload, Spin, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Authorization } from '../../utils';
const { confirm } = Modal;

const ListImage = ({ url, images, handleDelete, size, loading, handleUpdateImage }) => {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    useEffect(() => {
        setFileList(images);
    }, [images]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(fileList);
    };

    const onPreview = async (file) => {
        await handleUpdateImage(file.url);
    };

    const handleUpdateImageUrl = (url) => {
        // Implement the functionality if needed
    };

    return (
        <Spin spinning={loading}>
            <ImgCrop rotationSlider>
                <Upload
                    action={url}
                    headers={Authorization()}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    onRemove={handleDelete}
                    showUploadList={{
                        showPreviewIcon: true,
                        previewIcon: () => <CheckOutlined style={{ color : '#f6f6f6' }} />,
                    }}
                >
                    {fileList?.length < size && '+ Tải ảnh lên'}
                </Upload>
            </ImgCrop>
        </Spin>
    );
};

export default ListImage;
