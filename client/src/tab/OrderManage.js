import OrderAction from './OrderAction';
import { translateStatus } from './OrderStatus';
import useSWR from 'swr'

const fetcher = () => fetch(`${process.env.REACT_APP_ENDPOINT}/api/orders`).then(res => res.json())

function OrderManage() {
  const { data: orders, error } = useSWR('get/orders', fetcher)

  if (!orders) return <div>로딩 중 입니다.</div>
  if (error || orders.error) return <div>요청을 받아올 수 없습니다. 서버 문제같은데요?</div>

  return <>
    <header>
      <h3>주문 관리</h3>
    </header>
    <div className="list-view">
      <ul>
        <li className='list-item list-header'>
          <div className='col-id'>ID</div>
          <div>메뉴</div>
          <div>상태</div>
          <div></div>
        </li>
        {orders.map(order => <li className='list-item' key={order._id}>
          <div className='col-id'>{order._id.substring(0,4)}</div>
          <div>{order.orderedMenu.map(m => `${m.name} ${m.quantity}`).join(', ')}</div>
          <div>{translateStatus(order.deliveryInfo.status)}</div>
          <div className="action-btns">
            <OrderAction status={order.deliveryInfo.status} id={order._id} />
          </div>
        </li>)}
      </ul>
    </div>
  </>
}

export default OrderManage