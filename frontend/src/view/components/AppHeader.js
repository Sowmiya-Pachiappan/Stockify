import { Avatar, Col, Dropdown, Row } from 'antd';
import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const items = [
    {
      key: 'profile',
      label: <Link to='/profile'>Profile</Link>,
    },

    {
      key: 'logout',
      label: <Link to={'/logout'}>Logout</Link>,
    },
  ];
  return (
    <Row align={'middle'} justify={'end'}>
      <Col>
        <Dropdown
          placement={'bottomLeft'}
          menu={{ items }}
          overlayStyle={{
            width: 120,
          }}
        >
          <Avatar
            icon={<Icon className={'fi fi-rr-user'} size={16} />}
          />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default AppHeader;
