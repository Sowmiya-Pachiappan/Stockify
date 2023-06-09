import { Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
const SideBar = () => {
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(
    location.pathname === '/' || location.pathname === ''
      ? '/products'
      : location.pathname
  );
  useLayoutEffect(() => {
    const path =
      location.pathname === '/' || location.pathname === ''
        ? '/products'
        : location.pathname;
    setActiveRoute(path);
  }, [location]);

  const items = [
    getItem(<Link to={'/products'}>Products</Link>, '/products'),
    getItem(<Link to={'/invoices'}>Invoices</Link>, '/invoices'),
    getItem(<Link to={'/reports'}>Reports</Link>, '/reports'),
  ];

  return (
    <>
      <Link to={'/'}>
        <Typography.Title
          level={2}
          className='mb-0  text-center py-3'
        >
          Stockfiy
        </Typography.Title>
      </Link>
      <Menu
        selectedKeys={[activeRoute]}
        items={items}
        className='border-0'
      ></Menu>
    </>
  );
};

export default SideBar;
