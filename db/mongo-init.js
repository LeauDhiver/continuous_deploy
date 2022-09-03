db.createCollection('customer')
const customers = db.customer.insertMany([
  {"username":"김개발","address":"부산광역시 수영구 민락로 100번길"},
  {"username":"최운영","address":"서울시 마포구 양화로 777"}
])

db.createCollection('restaurants')
const menu1 = ObjectId()
const menu2 = ObjectId()
const restaurants = db.restaurants.insertMany([
  {
    "name": "용다방",
    "menu": [
      {
        "_id": ObjectId(),
        "name": "애플 시나몬 에이드",
        "price": 6500,
        "duration": 5
      },
      {
        "_id": ObjectId(),
        "name": "카페모카",
        "price": 6000,
        "duration": 5
      }
    ],
    "address": "서울시 마포구 양화로 1111",
    "rating": 4.5
  },
  {
    "name": "피프",
    "menu": [
      {
        "_id": ObjectId(),
        "name": "에스프레소",
        "price": 2000,
        "duration": 5
      },
      {
        "_id": ObjectId(),
        "name": "스트라파차토",
        "price": 2500,
        "duration": 5
      },
      {
        "_id": ObjectId(),
        "name": "크로플",
        "price": 3000,
        "duration": 10
      }
    ],
    "address": "서울시 마포구 성미산로 4444",
    "rating": 5
  },
  {
    "name": "동백커피",
    "menu": [
      {
        "_id": menu1,
        "name": "동백커피",
        "price": 4000,
        "duration": 10
      },
      {
        "_id": menu2,
        "name": "아인슈페너",
        "price": 4500,
        "duration": 10
      }
    ],
    "address": "부산시 수영구 센텀1로 777",
    "rating": 4.8
  },
  {
    "name": "미포 대구탕",
    "menu": [
      {
        "_id": ObjectId(),
        "name": "대구탕",
        "price": 10000,
        "duration": 20
      },
      {
        "_id": ObjectId(),
        "name": "알말이",
        "price": 6000,
        "duration": 20
      }
    ],
    "address": "부산시 해운대구 미포로 61",
    "rating": 4.5
  }
])

db.createCollection('courier')
const couriers = db.courier.insertMany([
  {"courier":"최배달","location":"35.169161,129.132079","available":false},
  {"courier":"박배송","location":"37.550806,126.903781","available":true}
])

db.createCollection('order')
db.order.insertMany([
  {
    "deliveryInfo": {
      "status":"preparing",
      "assignedCourier":"박배송",
      "estimatedDeleveryTime":40
    },
    "consumer_id": customers.insertedIds[0],
    "restaurant": {
      "name": "동백커피",
      "address": "부산시 수영구 센텀1로 777"
    },
    "orderedMenu":[
      {
        "name": "동백커피",
        "price": 4000,
        "quantity": 3
      },
      {
        "name": "아인슈페너",
        "price": 4500,
        "quantity": 2
      },
    ]
  }
])

db.createCollection('review')
db.review.insertMany([
  {
    "comment":"커피가 아주 일품이예요.","rating":4.5,"reply":"고객님 감사합니다. 더 좋은 커피로 보답하겠습니다.",
    "consumer_id": customers.insertedIds[0]
  }
])
