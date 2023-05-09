import * as React from 'react';
import { Input, List, Spin  } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import { debounce } from 'lodash';
import './style.scss';
const SearchInput = ({ onChange, searchResults, placeholder }) => {
  const [isClickInput, setIsClickInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState();
  const debouncedOnChange = React.useCallback(debounce((inputValue) => onChange(inputValue), 1000), [])

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setIsLoading(true);
    debouncedOnChange(inputValue);
  };

  return (
    <div className='search-container'>
      <Input
        className='input-data'
        placeholder={placeholder}
        onChange={handleInputChange}
        style={{ borderRadius: 0 }}
        value={value}
        onClick={() => setIsClickInput(true)}
        onBlur={() => setIsClickInput(false)}
      />
      {isClickInput && (
        <>
          {searchResults.length > 0 ? (
            <List
              className='list-search'
              bordered
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item 
                key={item.id} className='item-search'>
                  <div className='item-data' >{item.name}</div>
                </List.Item>
              )}
            />
          ) : (
            <div>
              {isLoading ? (
                <div  className='no-data-container'>
                  <Spin indicator={<LoadingOutlined />}/>
                </div>
              ) : (
                <div className='no-data-container'>
                  Không có kết quả tìm kiếm phù hợp
                </div>
              )}
            </div>

          )}
        </>
      )}
    </div>
  );
};

export default SearchInput;
