'use client';

import React from 'react';
import { Layout, Typography } from 'antd';
import JsonEditor from './components/JsonEditor';
import 'antd/dist/reset.css';
import './globals.css';

const { Header, Content } = Layout;
const { Title } = Typography;


const HomePage = () => (
  <Layout>
    <Header style={{ color: 'white' }}>
      <Title level={2} style={{ color: 'white' }}>JSON Editor</Title>
    </Header>
    <Content style={{ padding: '20px' }}>
      <JsonEditor />
    </Content>
  </Layout>
);

export default HomePage;
