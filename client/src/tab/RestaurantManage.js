import { useState, useEffect } from 'react'
import useSWR, { useSWRConfig } from "swr"

const fetcher = () => fetch(`${process.env.REACT_APP_ENDPOINT}/api/restaurant`).then(res => res.json())

function RestaurantManage() {
  const { data: restaurant, error } = useSWR('get/restaurant', fetcher)
  const { mutate } = useSWRConfig()

  const [menuPageIdx, setMenuPageIdx] = useState(0)
  const [currentMenu, setCurrentMenu] = useState(null)

  if (!restaurant) return <div>로딩 중 입니다.</div>
  if (error || restaurant.error) return <div>요청을 받아올 수 없습니다. 서버 문제같은데요?</div>

  const { menu } = restaurant

  const onSelectMenu = (menu) => {
    if(menu === null) {
      setCurrentMenu(null)
      setMenuPageIdx(0)
    }
    else {
      setCurrentMenu(menu)
      setMenuPageIdx(1)
    }
  }

  const onChangeMenu = (key) => {
    return (e) => {
      setCurrentMenu({
        ...currentMenu,
        [key]: e.target.value
      })
    }
  }

  const handleChangeMenu = () => {
    mutate('get/restaurant', async () => {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/menu/${currentMenu._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: currentMenu.name,
          price: currentMenu.price
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
    })
  }

  const handleNewMenu = () => {
    if (!currentMenu.name || !currentMenu.price) {
      alert('필요한 정보를 입력하세요')
      return
    }
    mutate('get/restaurant', async () => {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/menu`, {
        method: 'POST',
        body: JSON.stringify({
          name: currentMenu.name,
          price: currentMenu.price
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
    })
  }

  const handleDeleteMenu = () => {
    const ok = window.confirm('정말 이 메뉴를 삭제하시겠습니까?')
    if(!ok) return;

    mutate('get/restaurant', async () => {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/menu/${currentMenu._id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
    })
    setCurrentMenu(null)
    setMenuPageIdx(0)
  }

  const handleChangeRestaurant = (prop) => {
    const value = prompt('변경할 내용을 입력하세요')
    mutate('get/restaurant', async () => {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/restaurant`, {
        method: 'PATCH',
        body: JSON.stringify({
          [prop]: value
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
    })
  }

  return <>
    <div className={`page-depth-2 page-idx-${menuPageIdx}`}>
      <div className="page">
        <header>
          <div className="nav-back"></div>
          <h3>매장 관리</h3>
          <div className="nav-commit"></div>
        </header>
        <div>
          <h2>{restaurant.name}</h2>
          <div>{restaurant.address}</div>
          <div className="action-btns" style={{marginTop: '1rem'}}>
            <button onClick={() => handleChangeRestaurant('name')}>매장 이름 변경</button>
            <button onClick={() => handleChangeRestaurant('address')}>주소 변경</button>
          </div>
        </div>
        <div>
          <h2>메뉴 관리
            <a style={{float: 'right', transform: 'translateY(-5px)'}}
              onClick={() => onSelectMenu({ isNew: true })}>+ 메뉴 추가</a>
          </h2>
          <ul style={{ padding: 0 }}>
            <li className='list-item list-header'>
              <div>메뉴</div>
              <div>가격(₩)</div>
            </li>
            {menu.map(item => <li className='list-item list-selectable' key={item._id} onClick={() => onSelectMenu(item)}>
              <div>{item.name}</div>
              <div>{item.price}</div>
            </li>)}
          </ul>
        </div>
      </div>
      <div className="page">
        <header>
          <div className="nav-back">
            <a onClick={() => onSelectMenu(null)}>
              <img src="images/back-svgrepo-com.svg" />
              뒤로
            </a>
          </div>
          <h3>메뉴 관리</h3>
          <div className="nav-commit"></div>
        </header>
        {currentMenu ? <div>
          <div>
            <h2>메뉴 이름</h2>
            <input type="text" placeholder='메뉴 이름' value={currentMenu.name} onChange={onChangeMenu('name')} />
          </div>
          <div>
            <h2>가격</h2>
            ₩ <input type="number" placeholder='4000' value={currentMenu.price} onChange={onChangeMenu('price')} />
          </div>
          {
            currentMenu.isNew ?
            <button className='btn-primary' style={{marginTop: '2rem'}} onClick={handleNewMenu}>메뉴 추가</button> :
            <div className='action-btns'>
              <button className='btn-primary' style={{marginTop: '2rem'}} onClick={handleChangeMenu}>저장</button>
              <button className='btn-danger' style={{marginTop: '2rem'}} onClick={handleDeleteMenu}>메뉴 삭제</button>
            </div>
          }
        </div>: ''}
      </div>
    </div>
  </>
}

export default RestaurantManage
