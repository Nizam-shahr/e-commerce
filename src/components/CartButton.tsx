
import { useState } from 'react'
import SidePopUp from './SidePopUp';
import { ShoppingCartOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CartButton = () => {

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
      <div className='showPopup'>
    <button  onClick={showDrawer}>
    <span className='cart-icon'><ShoppingCartOutlined /></span>
      <h2>{Cart.length} Items</h2>
    </button>
    <strong className='cart-total'>${cartTotal}.00</strong>
    </div>
    <SidePopUp 
      showPopUp ={showPopup}
      onClose= {() => setShowPopup(false)}
    />
  </div>
  )
}

export default CartButton
