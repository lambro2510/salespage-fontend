import * as React from 'react';
import { Carousel, Row, Col, Image } from 'antd';
import './style.scss';
const AdsBanner = () => {
    const [banners, setBanners] = React.useState([
        'https://drive.google.com/u/0/uc?id=1-D9AkYJNsfh9sxtphy67kMRjdon2Q70E',
        'https://drive.google.com/u/0/uc?id=1jcgBxKBiUONvyJTHe3xb4BUUUDfRkTFT',
        'https://drive.google.com/u/0/uc?id=1gBn0KFngH1Yraem86jnvxzJQX6Ou7lgX',
        'https://drive.google.com/u/0/uc?id=1RMqJNHiIXris72hn0aH8H93hSL7Stvs2'

    ]);

    const [subBanner, setSubBan] = React.useState([
        'https://drive.google.com/u/0/uc?id=1vFWdMRSX1Rw5jm_fJ9AB64ta_sJuWQ6-',
        'https://drive.google.com/u/0/uc?id=1n5lX13PzMhWBxvyx2bdHsRMr-SXXPXmU',
        'https://drive.google.com/u/0/uc?id=18nM_ymXzLohsIsnAcI0iwdkfxwWUoLr7',
        'https://drive.google.com/u/0/uc?id=1uLd436X8LMQUgLcJAeUuhGgoSqRx_KO3',
        'https://drive.google.com/u/0/uc?id=1m95qDh9SbjeTRklVZsYYw0oxiLHlMTOe',
        'https://drive.google.com/u/0/uc?id=154Z6eGYVOOWcRcJ-EfU5XnBRxVDdVA6T',
        'https://drive.google.com/u/0/uc?id=1pHEV5a7yxkYv6ai7CHiBfKbWPs3XgazE',
        'https://drive.google.com/u/0/uc?id=1oCNQriMZmaJ61YZfGVLAGpyBd_SsJpuF',
        'https://drive.google.com/u/0/uc?id=1ufZLpKA2hZW3xfCqk2JffNJaKQrYdcze'

    ]);

    const [img1, setImg1] = React.useState('https://drive.google.com/u/0/uc?id=1g-Ji1POyTQgiSYTTT3OhyxjXn8GyW0Fp')
    const [img2, setImg2] = React.useState('https://drive.google.com/u/0/uc?id=1IqvJfOMymST66dPRdhCduDfzIJTsfDXE')



    return (
        <div className='main-banner'>
            <div className="banner-container">
            <Carousel autoplay arrows dots={{ position: 'top' }}>
                {banners.map((banner, index) => (
                    <img className='ads-image' src={banner} alt="Banner" key={index} />
                ))}
            </Carousel>
        </div>
        </div>
    );
};

export default AdsBanner;