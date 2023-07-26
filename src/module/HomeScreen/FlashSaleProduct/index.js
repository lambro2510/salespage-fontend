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
  slidesToShow: 9, 
  slidesToScroll: 1, 
  arrows : true,
  prevArrow: <LeftOutlined />, 
  nextArrow: <RightOutlined />,
};


const FlashSaleProduct = () => {
  const [flashSaleImg, setFlashSaleImage] = React.useState('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png');
  const [flsProducts, setFlsProducts] = React.useState([])
  const [metaData, setMetaData] = React.useState({
    page: 0,
    size: 10
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const flsResponse = await getFlashSaleProduct();
        console.log(flsResponse?.data);
        setMetaData(flsResponse?.metadata);
        setFlsProducts(flsResponse?.data);
        setFlashSaleImage(
          'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png'
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getFlashSaleProduct = async () => {
    const flashSaleProductResponse = await ProductService.findProduct(metaData);
    return flashSaleProductResponse;
  }

  return (
    <Row justify="center" span={24}>
      <Col justify="center" span={20}>
        <Card
          title={<Image preview={false} src={flashSaleImg} />}
          extra={<Link to="#">Xem tất cả</Link>}
          className='card-product'
        >
          <Carousel {...settings}>
            {flsProducts.map((flsProduct) => (
              <ProductCardComponent key={flsProduct.id} product={flsProduct} />
            ))}
          </Carousel>
        </Card>

      </Col>
    </Row>
  );
};

export default FlashSaleProduct;
