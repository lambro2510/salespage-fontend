import * as React from 'react';
import { Card, Col, Row, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';
import ProductService from '../../../service/ProductService';
import ProductCardComponent from '../../../component/ProductCardComponent';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <LeftOutlined />,
  nextArrow: <RightOutlined />,
};


const Product = () => {
  const [products, setProducts] = React.useState([])
  const [metaData, setMetaData] = React.useState({
    page: 0,
    size: 10
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const flsResponse = await getFlashSaleProduct();
        setMetaData(flsResponse?.metadata);
        setProducts(flsResponse?.data);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, []);


  const getFlashSaleProduct = async () => {
    const flashSaleProductResponse = await ProductService.findProduct(metaData);
    return flashSaleProductResponse;
  }

  return (
    <Row justify="center" span={24} className='product-container'>
      <Col justify="center" span={20}>
        <Card
          title={'Shop sản phâm'}
          extra={<Link to="#">Xem tất cả</Link>}
          className='card-product'
        >
          <Carousel {...settings}>
            {products.map((flsProduct) => (
              <ProductCardComponent key={flsProduct.id} product={flsProduct} />
            ))}
          </Carousel>
        </Card>

      </Col>
    </Row>
  );
};

export default Product;
