import { ProCard } from "@ant-design/pro-components";
import { Checkbox, Col, Input, Row, Typography, Slider, Form, Radio, Divider } from "antd";
import { useEffect, useState } from "react";
import { ProductDataResponse } from "../../interfaces/interface";
import { handleErrorResponse } from "../../utils";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import ListCardProduct from "../home/ListCardProduct";
import HomeBanner from "../home/HomeBanner";

interface ProductFilter {
    productName?: string | undefined,
    categoryName?: string | undefined,
    minPrice?: number | undefined,
    maxPrice?: number | undefined,
    like?: boolean | undefined,
    isHot?: boolean | undefined,
}
const { Text } = Typography;
const ProductList = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [allProduct, setAllProduct] = useState<ProductDataResponse[]>([]);
    const [filter, setFilter] = useState<ProductFilter>();
    const [current, setCurrent] = useState<number>(0)

    const getAllProduct = async () => {
        try {
            setLoading(true)
            const response = await http.get(`${apiRoutes.products}`, {
                params: {
                    ...filter,
                    page: current,
                    size: 12,
                },
            });
            setAllProduct([...allProduct, ...response.data.data.data]);
        } catch (err) {
            handleErrorResponse(err);
        } finally {
            setLoading(false)
        }
    };

    const newFilterProduct = async () => {
        try {
            const response = await http.get(`${apiRoutes.products}`, {
                params: {
                    ...filter,
                    page: 0,
                    size: 12,
                },
            });
            setAllProduct(response.data.data.data);
            setCurrent(0)
        } catch (err) {
            handleErrorResponse(err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        newFilterProduct();
    }, [filter]);

    useEffect(() => {
        if (current != 0) {
            getAllProduct();
        }
    }, [current]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    }


    const handleCheckboxChange = (e: any) => {
        setFilter({
            ...filter,
            like: e.target.checked,
        });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let minValue: string = value.split('-')[0];
        let maxValue: string = value.split('-')[1];
        Number.MAX_VALUE;
        setFilter({
            ...filter,
            minPrice: minValue !== undefined ? Number(minValue) : 0,
            maxPrice: maxValue !== undefined ? Number(maxValue) : Number.MAX_VALUE,
        });
    };

    return (
        <div className="flex justify-center">
            <Row gutter={[32, 16]} className="w-11/12">
                <Col span={24}><HomeBanner /></Col>
                <Col className="flex justify-center items-center" span={24}>
                    <Typography.Title title="Sản phẩm bán">
                        Danh sách sản phẩm
                    </Typography.Title>
                </Col>
                <Col span={24}><Divider /></Col>
                <Col xs={24} lg={4}>
                    <Form
                        className="w-full"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={12} lg={24} className="flex items-center">
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    name="productName"
                                    title="Tên sản phẩm"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Col>
                            {/* <Col xs={12} lg={24} className="flex items-center">
                                <Input
                                    placeholder="Nhập loại sản phẩm"
                                    name="categoryName"
                                    title="Tên loại sản phẩm"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Col> */}
                            <Col xs={12} lg={24}>
                                <Row>
                                    <Col span={24}>
                                        <span>Giá tiền</span>
                                    </Col>
                                    <Radio.Group onChange={(e: any) => handleRadioChange(e)} value={`${filter?.minPrice}-${filter?.maxPrice}`}>
                                        <Col span={24}>
                                            <Radio value={`0-${Number.MAX_VALUE}`}>Tất cả</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="0-100000">0 - 100,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="100000-500000">100,000 - 500,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="500000-1000000">500,000 - 1,000,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="1000000-2000000">1,000,000 - 2,000,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="2000000-5000000">2,000,999 - 5,000,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value={`5000000-${Number.MAX_VALUE}`}>Trên 5,000,000</Radio>
                                        </Col>
                                    </Radio.Group>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={24} lg={20}>
                    <ListCardProduct
                        title=""
                        products={allProduct}
                        loading={loading}
                        nextPage={() => setCurrent(current + 1)}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProductList;
