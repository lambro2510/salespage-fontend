import * as React from 'react';
import MainMenu from './MainMenu';
import AdsBanner from './AdsBanner';

const HomeScreen = () => {
    return (
        <div className='home'>
            <MainMenu></MainMenu>
            <AdsBanner></AdsBanner>
        </div>
    )
}

export default HomeScreen;