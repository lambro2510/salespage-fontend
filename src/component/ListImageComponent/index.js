import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState, useEffect } from 'react';
import { URL } from '../../constant';

const ListImage = ({ uploadUrl, imageUrls, handleDelete, handleUpload, size }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const newFileList = imageUrls?.map((imageUrl, index) => ({
      uid: `-${index}`,
      name: `image-${index}.png`,
      status: 'done',
      url: imageUrl,
    }));
    setFileList(newFileList);
  }, [imageUrls]);

  const onChange = (info) => {
    const { file, fileList } = info;
    setFileList(fileList);
    console.log('-----------------');
    if (file.status === 'done' && handleUpload) {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      handleUpload(formData);
    }
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
    <ImgCrop rotationSlider>
      <Upload
        action={onChange}
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        onChange={onChange}
        multiple 
      >
        {fileList?.length >= 8 ? null : '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default ListImage;
