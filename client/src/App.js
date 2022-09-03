import './App.css';
import { useState, useEffect } from 'react'
import OrderAction from './tab/OrderAction';
import { OrderStatus, translateStatus } from './tab/OrderStatus';
import TabItem from './TabItem';
import TabBar from './TabBar';
import OrderManage from './tab/OrderManage';
import RestaurantManage from './tab/RestaurantManage';

function App() {

  const [currentTab, setCurrentTab] = useState("주문 관리")


  return (
    <div className="app">
      <TabItem visible={currentTab === '주문 관리'}>
        <OrderManage />
      </TabItem>
      <TabItem visible={currentTab === '매장 관리'}>
        <RestaurantManage />
      </TabItem>
      <TabBar onChange={setCurrentTab} currentTab={currentTab}>
        <TabBar.Item label="주문 관리" icon="shopping-cart"></TabBar.Item>
        <TabBar.Item label="매장 관리" icon="shop"></TabBar.Item>
      </TabBar>
    </div>
  );
}

export default App;
