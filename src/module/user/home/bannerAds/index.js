import React, { useState } from 'react';
import { Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './style.scss';

const BannerAds = () => {
  const [banners, setBanners] = useState([
    'https://cdn.printnetwork.com/production/assets/5966561450122033bd4456f8/imageLocker/blog-description/blog/sales_banners.jpg',
    'https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg',
    'https://cdn1.vectorstock.com/i/1000x1000/96/50/super-sale-banner-template-design-vector-23449650.jpg',
    'https://i.ytimg.com/vi/MoGiagwDnn0/maxresdefault.jpg',
    'https://www.shutterstock.com/image-vector/sale-banner-template-design-260nw-487080769.jpg',
    'https://static.vecteezy.com/system/resources/previews/003/692/287/original/big-sale-discount-promotion-banner-template-with-blank-product-podium-scene-graphic-free-vector.jpg'
  ]);

  const bannerTransitionTime = 5000;

  const carouselSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: bannerTransitionTime,
    centerMode: true,
    prevArrow: <ArrowLeftOutlined className="prev-arrow" />,
    nextArrow: <ArrowRightOutlined className="next-arrow" />,
  };

  return (
    <div className="banner-container">
      <Carousel {...carouselSettings}>
        {banners.map((banner, index) => (
            <img className='ads-image' src={banner} alt="Banner" />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerAds;
