import { Layout } from 'antd';
import SideBar from '../view/components/SideBar';
import AppHeader from '../view/components/AppHeader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signin);
  useEffect(() => {
    if (!userInfo) {
      <Navigate to='login' />;
    }
  }, [userInfo]);

  const { Header, Content, Sider } = Layout;
  return (
    <Layout className='bg-transparent min-vh-100' hasSider>
      <Sider width={240} className='bg-transparent border-end'>
        <SideBar />
      </Sider>

      <Layout className='bg-transparent'>
        <Header className='bg-transparent border-bottom'>
          <AppHeader />
        </Header>
        <Content className='bg-transparent p-3 p-md-5'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
