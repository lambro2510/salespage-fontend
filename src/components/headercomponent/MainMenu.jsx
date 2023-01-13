import React from "react";
import { Input,Button } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons"
import TopMenu from "./menucomponent/TopMenu";
import "./MainMenu.css"
function MainMenu() {
    return (
        <div className="header">
            <TopMenu />
            <div className="main-header">
                <div className="header-with-search">
                    <a className="logo" href="">
                        <img src="https://lh3.googleusercontent.com/BgJ_1VZ4PKp-MyEVex38WTySXscbQi6wSRHkOGG2iwrpZAE0Gfo2YJZRhb7a2pu-Usst-xxM29pcbt3zfTUD3VOCokcbCfpXqyWFhHaINSt2go8pjb0bkrvg65c_niIle4MEsOSRX8mz4RWOgRwKkuNIODAlJKJqim5xBhveKafj505J2jFtpxWZHL2IzHTOwKzo9e6RMDDTcKcR5CfiTq383zFyijsLo4u1OVxXelgyp9qGKDJ5RA214pYCMKShYgsGI-EJdkAA-1I9yUIx7hxq4Qf5BNoxjsin_7EgFSmDScAd875sULwEo4ib8bc4zKHO0BZsAnBsvQkkY6ipJ0uFb5vRqtU3ic37YbcceUFWCLXd7W97NvZ27T5wCXunt4wz_I8tke-XJnDekuctpytxSZ8adkrwKwnQUwHwTYtQzkx99sLGs9qyR6q7lbWTl0anU_CPNKYzhZUQaa_tz3PeFf61g52Q1rxABTFWJXIuYYJdpApUTNS3e_ZLjMnYyf6wpuX7-zlOUukueFZkVq0i6thspL3eUnes3ZSn0cG9QY5ainHlkKug6Sl1-Tz5T7KlUsFSxdOeVviS3micFTG8IAR15FrIHVmjFtLrSn2dmfDG7L_Gx8cMmptKYRMElfOCC_PupqK_sBfixq7pwj5sg5khlmNcS2hxO3jhAfJs5jsaK1zULF5QPmpQFGZRFcs0cWobeK5y1bYfCGJQtj3BIJy3V8-dfBWWZFHIIsWn8_W5qRtLBMN-jrc1PniNm-74FIe5Dojed587KzhBiLYZien5STSqLzU3jPS0SC-03eaB1GxhnKVr34P35GjGIcGarqG0lEo1iPiDLB7Uuk62n0Q3Qmo_Ll8I3daF8doMb_JJ7xZpOopaYhl_-IGv07y_qmsAhBFNnAxlLDnBxIZ7tIAv_JsWJ1PNhxaIxIN-62RiTEVvqTGhjyLAJ1NFI4E5IRns_GKdcKl1z2by=s346-no?authuser=0" alt="Logo" />
                    </a>
                    <div className="search-menu">
                        <Input  placeholder="Search..." suffix={<Button type="primary" shape="circle" icon={<SearchOutlined />} />}/>
                        <div>
                            <a href="" className="hover-fade">Túi xách nữ</a>
                            <a href="" className="hover-fade">Áo khoác</a>
                            <a href="" className="hover-fade">Dép</a>
                            <a href="" className="hover-fade">Giày</a>
                            <a href="" className="hover-fade">Áo khoác nam</a>
                            <a href="" className="hover-fade">Áo thun</a>
                            <a href="" className="hover-fade">Giày nam</a>
                        </div>
                    </div>
                    <ShoppingCartOutlined />
                </div>
            </div>
        </div>
    )
}

export default MainMenu;