import { Card, Image } from 'antd';
import * as React from 'react';
import './style.scss';
const ProductCardComponent = ({ product }) => {
    return (
        <div className='card'>
            <Card cover={<Image preview={false} src={product?.imageUrl} />} title={product?.productName} style={{height : '100%'}}>
            </Card>
        </div>
    )
}

export default ProductCardComponent;