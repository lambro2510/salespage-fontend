import React, { useState, useEffect } from 'react';
import { Modal, Upload, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import { Authorization } from '../../utils';
const { confirm } = Modal;

const ListImage = ({ url, images, handleDelete, size, loading }) => {
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
    }, [images])

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(fileList);
        
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                >
                    {fileList?.length < size && '+ Tải ảnh lên'}
                </Upload>
            </ImgCrop>
        </Spin>
    );
};

export default ListImage;
