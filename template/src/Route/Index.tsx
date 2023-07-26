import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Button, Result } from 'antd';

const handleClickBackIndex = () => {
  const location = window.location;
  location.pathname = '/index';
};

const notFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不见了，请返回首页"
      extra={
        <Button type="primary" onClick={() => handleClickBackIndex()}>
          返回首页
        </Button>
      }
    />
  );
};

const Routes: RouteObject[] = [
  {
    path: '/login',
    caseSensitive: true,
    element: <div>登录</div>
  },
  {
    path: '/',
    caseSensitive: true,
    element: <div>Hello world</div>,

    children: [
      {
        path: '*',
        caseSensitive: true,
        element: notFound()
      }
    ]
  }
];
export default Routes;
