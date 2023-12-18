
import { useState } from 'react'
import HamburgerSidePopUp from './HamburgerSidePopup';
import { ShoppingCartOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Props = {
    setIsLogoutOpen: (isLogoutOpen:boolean) => void 
    loggedIn : boolean
    setIsModalOpen: (isModalOpen : boolean) => void
}

const  Hamburger = ({setIsLogoutOpen, loggedIn, setIsModalOpen}: Props) => {

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const showDrawer = () => {
    setShowPopup(true);
  };



  return (
    <div>
           <div onClick={showDrawer} className='flex flex-col gap-1' >
     <span className=' py-1 px-5 bg-slate-800'></span>
     <span className=' py-1 px-5 bg-slate-800'></span>
     <span className=' py-1 px-5 bg-slate-800'></span>
  </div>
  <HamburgerSidePopUp
      showPopUp ={showPopup}
      onClose= {() => setShowPopup(false)}
      setIsLogoutOpen = {setIsLogoutOpen}
      loggedIn= {loggedIn}
      setIsModalOpen ={setIsModalOpen}
      setShowPopup = {setShowPopup}
    />
    </div>
 
  )
}

export default Hamburger
