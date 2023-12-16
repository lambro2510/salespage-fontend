import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { handleErrorResponse, showNotification } from '../../utils';
import { apiRoutes } from '../../routes/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import http from '../../utils/http';

interface UploadComponentProps {
    imgUrl?: string
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        showNotification('Bạn chỉ có thể tải lên file ảnh đuôi image hoặc jpeg!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        showNotification('Ảnh phải nhỏ hơn 2MB');
    }
    return isJpgOrPng && isLt2M;
};

const UploadComponent: React.FC<UploadComponentProps> = ({ imgUrl }) => {
    const auth = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(imgUrl);
    const [fileImage, setFileImage] = useState<any[]>([]);
    useEffect(() => {
        if (imageUrl) {
            setFileImage([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${imgUrl}`,
            }])
        }
    }, [imgUrl, imageUrl])

    const handleRemove = async (url: string) => {
        try {
            await http.delete(`${apiRoutes.user}/avatar`)
            setFileImage([]);
        } catch (err) {
            handleErrorResponse(err)
        }
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </div>
    );

    return (
        <div className='flex justify-center items-center'>
            <Upload
                name="file"
                method='POST'
                headers={{
                    'Authorization': `Bearer ${auth?.token}`
                }}
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={true}
                fileList={fileImage}
                action={`${apiRoutes.user}/uploadImage`}
                onRemove={async (file: any) => handleRemove(file?.url)}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl == undefined || imageUrl == null ? uploadButton : null}
            </Upload>
        </div>
    );
};

export default UploadComponent;
