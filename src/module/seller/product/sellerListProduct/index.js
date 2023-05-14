import * as React from 'react';
import { useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import ProductService from '../../../../service/ProductService';
import SellerProductList from '../ProductList';
import SearchProductInput from '../searchSellerProduct';
import SellerProductModal from '../sellerProductModal';
const PAGESIZE = 8;
const SellerListProduct = () => {
    const profileData = useSelector((state) => state.auth);
    const [update, setUpdate] = React.useState(false)
    const [isLoading, setIsloading] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const [product, setProduct] = React.useState({})
    const [sellerProduct, setSellerProduct] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [metaData, setMetaData] = React.useState({
        total: 0,
        page: 0
    })
    const [productFilter, setProductFilter] = React.useState({});

    React.useEffect(() => {
        fetchData();
    }, [currentPage,update])

    const getSellProduct = async () => {
        const response = await ProductService.findProduct(
            {
                ...productFilter,
                ownerStoreUsername: profileData.username,
                page: currentPage - 1,
                size: PAGESIZE
            });
        return response;
    }

    const fetchData = async () => {
        try {
            setIsloading(true);
            const data = await getSellProduct();
            setSellerProduct(data.data);
            setMetaData(data.metadata)
            setIsloading(false)
        } catch (err) {
            setIsloading(false)
        }
    }

    const updateProduct = () => {
        setUpdate(!update)
    }

    return (
        <div>
            <SellerProductModal setVisible={setVisible} visible={visible} id={product.productId} update={update} setUpdate={() => updateProduct()}/>
            <SearchProductInput handleSearch={fetchData} productFilter={productFilter} setProductFilter={setProductFilter} />
            <Spin spinning={isLoading} size="large" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <SellerProductList productList={sellerProduct} setVisible={setVisible} setProduct={setProduct} />
            </Spin>
            <Pagination current={currentPage} total={metaData.total} pageSize={PAGESIZE} onChange={setCurrentPage} showSizeChanger={false} style={{ marginTop: 16, textAlign: 'center' }} />
        </div>
    );
}

export default SellerListProduct;