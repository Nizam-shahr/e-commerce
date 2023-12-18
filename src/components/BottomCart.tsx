
import { useState } from 'react'
import SidePopUp from './SidePopUp';
import { ShoppingCartOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import BottomPopup from '@/components/BottomPopup'

const BottomCart = () => {

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const showDrawer = () => {
    setShowPopup(true);
  };
  const Cart = useSelector((state: RootState) => state.cart.cart)
  
 const cartTotal = Cart.reduce(
    (total, item: any) => (total += item.price * item.count),
    0
  );


  return (
    <div >
      <div onClick={showDrawer} className='showPopups'>
    <button className='flex items-center'  >
    <span className='cart-icon'><ShoppingCartOutlined /></span>
      <h2>{Cart.length} Items</h2>
    </button>
    <h2 className='cart-total'>${cartTotal}.00</h2>
    </div>
    <BottomPopup
      showPopUp ={showPopup}
      onClose= {() => setShowPopup(false)}
    />
  </div>
  )
}

export default BottomCart
