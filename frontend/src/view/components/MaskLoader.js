import { Modal, Spin } from 'antd';
import React from 'react';

const MaskLoader = () => {
  return (
    <Modal
      centered
      open={true}
      footer={null}
      width={'auto'}
      modalRender={() => <Spin />}
    />
  );
};

export default MaskLoader;
