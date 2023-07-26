import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Routes from '../Route/Index';
import 'antd/dist/antd.min.css';

// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

const App = () => {
  const Views = () => useRoutes(Routes);
  return <Views />;
};

const Main: React.FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  );
};

export default Main;
