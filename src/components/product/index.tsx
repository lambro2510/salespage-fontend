import { PageContainer } from "@ant-design/pro-components";
import { webRoutes } from "../../routes/web";
import { BreadcrumbProps } from "antd";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { ProductDetail } from "../../interfaces/models/product";



const ProductDetailView = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState<ProductDetail>();
    const breadcrumb: BreadcrumbProps = {
        items: [
            {
                key: webRoutes.home,
                title: <Link to={webRoutes.home}>Trang chủ</Link>,
            },
            {
                key: webRoutes.products,
                title: <Link to={webRoutes.products}>sản phẩm</Link>,
            },
            {
                key: `${webRoutes.products}/${productId}`,
                title: product?.productName,
            }
        ],
    };

    return(
        <PageContainer breadcrumb={breadcrumb}>

        </PageContainer>
    )
}

export default ProductDetailView;