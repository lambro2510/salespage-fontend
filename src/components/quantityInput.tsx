import { Button, Col, InputNumber, Row, Typography } from "antd";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";

const { Text } = Typography;

const QuantityInput = ({ quantity, setQuantity, limit, description }: { quantity: number, setQuantity: any, limit: number | undefined, description: any }) => {

    const handleIncrement = () => {
        if(!limit){
            limit = 99999
        }
        
        if (typeof limit === 'number') {
            if (quantity < limit) {
                setQuantity(quantity + 1);
            }
        } else {
            // Handle the case when limit is undefined
            // You can choose to do nothing or add custom logic here
        }
    };

    const onQuantityChange = (value: any) => {
        if(!limit){
            limit = 99999
        }
        
        if (value < 1) {
            setQuantity(1);
        }
        else if (typeof limit === 'number') {
            if (value > limit) {
                setQuantity(limit);
            } else {
                setQuantity(value);
            }
        } else {
            // Handle the case when limit is undefined
            // You can choose to do nothing or add custom logic here
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Row >
            <Col className="flex items-center">
                <Button className="rounded-none" icon={<RiSubtractFill />} onClick={handleDecrement}></Button>
                <InputNumber className="rounded-none" min={1} defaultValue={1} value={quantity} onChange={(value) => onQuantityChange(value)} />
                <Button className="rounded-none" icon={<RiAddLine />} onClick={handleIncrement}></Button>
                <Text className="text-gray-500">&nbsp;{limit !== undefined ? limit : ''} {description}</Text>
            </Col>
        </Row>
    )
}

export default QuantityInput;
