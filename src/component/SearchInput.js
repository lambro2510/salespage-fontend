import * as React from 'react';
import { Input, List } from 'antd';
import { debounce } from 'lodash';
const SearchInput = ({ onChange, searchResults, placeholder }) => {
  const [isClickInput, setIsClickInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const debouncedOnChange = React.useMemo(() => debounce(onChange, 2000), [onChange]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setIsLoading(true);
    debouncedOnChange(event.target.value);
    setIsLoading(false);
  };
  
  return (
    <div style={{ position: 'relative' }}>
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
              style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 1, backgroundColor: '#f6f6f6' }}
              bordered
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item className='item' style={{ backgroundColor: '#f6f6f6' }}>
                  <div className='item-data'>{item.productName}</div>
                </List.Item>
              )}
            />
          ) : (
            <div>
              {isLoading ? (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 1, textAlign: 'center', padding: '5px 0px', backgroundColor: '#f6f6f6', border: '1px black solid' }}>
                  Đang tải...
                </div>
              ) : (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 1, textAlign: 'center', padding: '5px 0px', backgroundColor: '#f6f6f6', border: '1px black solid' }}>
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
