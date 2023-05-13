import * as React from 'react'

import BannerAds from '../bannerAds';
import ProductMenu from '../../menu/mainMenu';

const HomeProductMenu = () => {
    return (
        <>
            <div className='banner-container' >
                <BannerAds />
            </div>
            <ProductMenu />
        </>
    )
}

export default HomeProductMenu