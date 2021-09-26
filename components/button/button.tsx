import React from 'react';
import { Button, ButtonProps } from 'antd';

export type OpenButtonProps = ButtonProps;

const OpenButton = (props: OpenButtonProps) => {
  const newProps: OpenButtonProps = { ...props, type: 'primary' };

  return <Button {...newProps}>按钮{props.children}</Button>;
};

export default OpenButton;
