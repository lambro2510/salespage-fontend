import { Col, Row } from "antd";
import Slider from "react-slick";
import LazyImage from "../lazy-image";
import Banner from "../base/Banner";

const imagesData = [
    {
        imageUrl: "https://cf.shopee.vn/file/vn-50009109-2eb798374b65de905510aa91380aaf62_xxhdpi",
        title: "Giảm giá sock",
        subTitle: "Nhận khuyến mãi lên đến 99.000Đ khi tham gia chương trình",
        link: "#",
    },
    {
        imageUrl: "https://cf.shopee.vn/file/vn-50009109-3b4844af326ff3b9c1e1793d0dbda9f3_xxhdpi",
        title: "Tham gia E-Web ngay",
        subTitle: "Nhận ngay mã giảm giá 50.000Đ cho đơn hàng đầu tiên",
        link: "#",
    },
    {
        imageUrl: "https://cf.shopee.vn/file/vn-50009109-31751216f4ecebd91cd98b2aabe69c70_xxhdpi",
        title: "Săn sale cuối tuần",
        subTitle: "Xem quảng cáo nhận xu, ngoài ra còn các mã giảm giá lên đến 60.000Đ đang chờ bạn",
        link: "#",
    },
    {
        imageUrl: "https://cf.shopee.vn/file/vn-50009109-1f18bb1d3f752570668b28ee92501320_xxhdpi",
        title: "Khuyến mãi sản phẩm gia đình",
        subTitle: "Nhận khuyến mãi lên đến 50% khi tham gia chương trình",
        link: "#",
    },
    {
        imageUrl: "https://cf.shopee.vn/file/vn-50009109-0fffe0b1b0b7e9af17ad1e53346f4311_xhdpi",
        title: "Làm đẹp không giới hạn",
        subTitle: "Nhận khuyến mãi lên đến 50% khi tham gia chương trình",
        link: "#",
    }
];

const backgroundUrl = "https://media.istockphoto.com/id/1326061969/vi/anh/n%E1%BB%81n-t%E1%BA%A3ng-c%E1%BB%A7a-m%E1%BB%99t-tr%C4%83m-t%E1%BB%9D-euro.jpg?s=2048x2048&w=is&k=20&c=WacclBMxsTHx0YoeT5mhHjfRkFHEQLD4RmwoeHmPmfA="

const settings = {
    dots: false,
    infinite: true,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const HomeBanner = () => {
    return (
        <div className="bg-base flex justify-center items-center" style={{ position: 'relative', background: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <Row style={{ padding: '2% 5%' }}>
                <Col span={24}>
                    <Slider {...settings} >
                        {imagesData.map((img, index) => (
                            <Banner imageUrl={img.imageUrl} title={img.title} subTitle={img.subTitle} link={img.link}/>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    )
}


export default HomeBanner;