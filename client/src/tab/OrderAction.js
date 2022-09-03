import { useSWRConfig } from "swr"

import { OrderStatus } from './OrderStatus';

function OrderAction({ status, id }) {
  const { mutate } = useSWRConfig()

  const handleStatusChange = (status) => {
    mutate('get/orders', async (orders) => {
      const updatedOrder = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
          status
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())

      const filteredOrders = orders.filter(d => d._id !== id)
      return [...filteredOrders, updatedOrder]
    })
  }

  if(status === OrderStatus.WAITING) {
    return <>
      <button className="btn-primary" onClick={() => handleStatusChange(OrderStatus.PREPARING)}>수락</button>
      <button onClick={() => handleStatusChange(OrderStatus.REJECTED)}>거절</button>
    </>
  }
  else if(status === OrderStatus.PREPARING) {
    return <button onClick={() => handleStatusChange(OrderStatus.READY_TO_PICK_UP)}>배달 요청</button>
  }
  else {
    return ''
  }

}

export default OrderAction;