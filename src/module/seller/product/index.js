import * as React from 'react'
import SearchProductInput from './searchSellerProduct'
import SellerProductModal from './sellerProductModal'
import SellerListProduct from './sellerListProduct'
const SellerProduct = () => {
    return (
        <div>
             <SellerProductModal setVisible={setVisible} visible={visible} id={product.productId} />
            <SearchProductInput handleSearch={fetchData} productFilter={productFilter} setProductFilter={setProductFilter} />
            <SellerListProduct />
        </div>
    )
}