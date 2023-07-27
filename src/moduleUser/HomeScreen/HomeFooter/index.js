import * as React from 'react';
import { Layout } from 'antd';
import './style.scss';
const { Header, Content, Footer } = Layout;

const HomeFooter = () => {
    return (
        <Layout className='footer-layout'>
          <Header className='footer-header'>Shoppe secondhand của Lambro25102001</Header>
          <Content>
            {/* Your main content goes here */}
            <div>
              {/* Place your main content here */}
            </div>
          </Content>
    
          {/* First Footer */}
          <Footer  style={{ backgroundColor: '#001529', color: '#fff', padding: 16, textAlign: 'center' }}>
            © {new Date().getFullYear()} Your Online Store. All rights reserved.
          </Footer>
    
          {/* Second Footer */}
          <Footer style={{ backgroundColor: '#f0f2f5', padding: 16, textAlign: 'center' }}>
            Contact us at contact@example.com
          </Footer>
    
          {/* Third Footer */}
          <Footer style={{ backgroundColor: '#001a33', color: '#fff', padding: 16, textAlign: 'center' }}>
            Follow us on social media: Facebook, Twitter, Instagram
          </Footer>
        </Layout>
      );
}

export default HomeFooter;