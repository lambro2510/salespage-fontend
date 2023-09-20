import { PageContainer } from "@ant-design/pro-components";
import { webRoutes } from "../../routes/web";
import { BreadcrumbProps } from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDetail } from "../../interfaces/models/product";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";


const ProductDetailView = () => {
    const {productId, productName} = useParams();
    const [product, setProduct] = useState<ProductDetail>();

    const getProductDetail = async () => {
        await http.get(`${apiRoutes.products}/detail?productId=${productId}`)
    }

    useEffect(() => {
        getProductDetail()
    }, [])

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
                title: productName,
            }
        ],
    };

    return(
        <PageContainer breadcrumb={breadcrumb}>

        </PageContainer>
    )
}

export default ProductDetailView;