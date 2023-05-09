import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
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

  // Thời gian chuyển đổi banner, tính bằng mili giây
  const bannerTransitionTime = 2000;

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 250,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: bannerTransitionTime,
    centerMode: true, 
    
  };

  return (
    <div className="banner-container">
      <Slider {...sliderSettings}>
        {banners.map((banner, index) => (
          <img className='ads-image' key={index} src={banner} alt="Banner" />
        ))}
      </Slider>
    </div>
  );
};

export default BannerAds;
