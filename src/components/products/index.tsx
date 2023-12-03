import { ProCard } from "@ant-design/pro-components";
import { Checkbox, Col, Input, Row, Typography, Slider, Form, Radio } from "antd";
import { useEffect, useState } from "react";
import { ProductDataResponse } from "../../interfaces/interface";
import { handleErrorResponse } from "../../utils";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import ListCardProduct from "../home/ListCardProduct";

interface ProductFilter {
    productName?: string | undefined,
    categoryName?: string | undefined,
    minPrice?: number | undefined,
    maxPrice?: number | undefined,
    like?: boolean | undefined,
    isHot?: boolean | undefined,
}
const { Text } = Typography;
const maxNumber = Number.MAX_VALUE;
const ProductList = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [allProduct, setAllProduct] = useState<ProductDataResponse[]>([]);
    const [filter, setFilter] = useState<ProductFilter>();
    const [current, setCurrent] = useState<number>(0)
    const getAllProduct = async (page : number) => {
        try {
            const response = await http.get(`${apiRoutes.products}`, {
                params: {
                    ...filter,
                    page: page,
                    size: 12,
                },
            });
            if (current == 0) {
                setAllProduct(response.data.data.data);
            } else {
                setAllProduct([...allProduct, ...response.data.data.data]);
            }
        } catch (err) {
            handleErrorResponse(err);
        }
    };

    useEffect(() => {
        getAllProduct(0);
    }, [filter]);

    useEffect(() => {
        getAllProduct(current);
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
        let minValue: string | undefined = value.split('-')[0];
        let maxValue: string | undefined = value.split('-')[1];
        if (maxValue == '0') {
            maxValue = '999999999999999999999';
        }
        Number.MAX_VALUE;
        setFilter({
            ...filter,
            minPrice: minValue !== undefined ? Number(minValue) : undefined,
            maxPrice: maxValue !== undefined ? Number(maxValue) : undefined,
        });
    };

    return (
        <div className="flex justify-center">
            <Row gutter={[32, 16]} className="w-11/12">
                <Col xs={24} lg={4}>
                    <Form
                        className="w-full"
                    >
                        <Row gutter={[16, 16]}>
                            <Col lg={24} className="flex items-center">
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    name="productName"
                                    title="Tên sản phẩm"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={24} className="flex items-center">
                                <Input
                                    placeholder="Nhập loại sản phẩm"
                                    name="categoryName"
                                    title="Tên loại sản phẩm"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={24} className="flex items-center">
                                <Checkbox name="like" onChange={handleCheckboxChange} />
                                <span>Yêu thích</span>
                            </Col>
                            <Col lg={24}>
                                <Row>
                                    <Col span={24}>
                                        <span>Giá tiền</span>
                                    </Col>
                                    <Radio.Group onChange={(e: any) => handleRadioChange(e)} value={`${filter?.minPrice}-${filter?.maxPrice}`}>
                                        <Col span={24}>
                                            <Radio value={`0 - ${maxNumber}`}>Tất cả</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="0-100000">0 - 100,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="100000-500000">100,000 - 500,000</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="500000-1000000">500,000 - 1,000,999</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="1000000-2000000">1,000,000 - 2,000,999</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="2000000-5000000">2,000,999 - 5,000,999</Radio>
                                        </Col>
                                        <Col span={24}>
                                            <Radio value="5000000">Trên 5,000,999</Radio>
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
                        loading={false}
                        nextPage={() => setCurrent(current + 1)}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProductList;
