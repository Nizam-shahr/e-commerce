
import { useState } from 'react'
import HamburgerSidePopUp from './HamburgerSidePopup';
import { ShoppingCartOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ItemSelector } from '.';
import FilterItems from './FilterItems';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
    onFilteredProducts: any
}

const Filter = ({onFilteredProducts}: Props) => {

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const showDrawer = () => {
    setShowPopup(true);
  };



  return (
    <div>
           <div onClick={showDrawer} className='flex flex-col gap-1 text-yellow-300 text-2xl' >
     Filter
  </div>
  
        <FilterItems 
         showPopUp ={showPopup}
         onClose= {() => setShowPopup(false)}
         onFilteredProducts={onFilteredProducts}
        />

    </div>
 
  )
}

export default Filter
