import * as React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
const SellerListProduct = () => {
    const profileData = useSelector((state) => state.auth);
    const [sellerProduct, setSellerProduct] = React.useState([]);

    React.useEffect(() => {
        console.log(profileData);
    }) 
    return({});
}

export default SellerListProduct;
