import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SearchUI() {
    return (
        <div>
            <Button style={{backgroundColor:"inherit"}} type="primary" shape="round" icon={<SearchOutlined />}>
                Search
            </Button>
        </div>
    )
}

export default SearchUI
