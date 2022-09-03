export const OrderStatus = {
  // 식당이 바꿀 수 있는 상태
  WAITING: 'WAITING',
  REJECTED: 'REJECTED',
  PREPARING: 'PREPARING',
  READY_TO_PICK_UP: 'READY_TO_PICK_UP',

  // 배달원이 바꿀 수 있는 상태
  IN_DELIVERY: 'IN_DELIVERY',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
}

export const translateStatus = (status) => {
  switch(status) {
    case OrderStatus.WAITING: return '주문 대기'
    case OrderStatus.REJECTED: return '주문 반려'
    case OrderStatus.PREPARING: return '메뉴 준비 중'
    case OrderStatus.READY_TO_PICK_UP: return '픽업 대기 중'
    case OrderStatus.IN_DELIVERY: return '배달 중'
    case OrderStatus.COMPLETED: return '배달 완료'
    case OrderStatus.FAILED: return '배달 실패'
    default: return ''
  }
}