import React from 'react';

const Icon = ({ className, color, size, ...props }) => {
  return (
    <i
      className={className}
      style={{
        color: color,
        fontSize: size ? size : 20,
        cursor: 'pointer',
      }}
      {...props}
    ></i>
  );
};

export default Icon;
