"use client";
import React, { useState } from "react";
import { Button, Divider, Drawer, Radio, Space } from "antd";
import Image from "next/image";

const App: React.FC<{ showPopUp: boolean; onClose: any , setIsLogoutOpen:(isLogoutOpen:boolean)=> void, 
    setIsModalOpen: (isModalOpen : boolean) => void, loggedIn: boolean, setShowPopup:(showPopUp: boolean) => void }> = ({
  showPopUp,
  onClose,
  setIsLogoutOpen,
  loggedIn, 
  setIsModalOpen, setShowPopup
}) => {
  // const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  // const onChange = (e: RadioChangeEvent) => {
  //   setPlacement(e.target.value);
  // };
 


  const onClicks = ()=> {
    setIsModalOpen(true)
    setShowPopup(false)
  }
  return (
    <>
      {/* <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space> */}
      <Drawer
      placement="left"
        title={
          <div className="flex justify-between items-center">
          
          </div>
        }
        // placement={placement}
        width={600}
        onClose={onClose}
        open={showPopUp}
      >
       <div>
        <div className="flex justify-between item-center bg-slate-100 p-4 my-8">
            {loggedIn ?  <div> <Image src='/user.png' width={30} height={20} alt=""/>
                <h3>09066777502</h3></div> : <h2 className="text-xl" onClick={onClicks}>SignIn</h2> }
               
        </div>
        <div className="flex flex-col gap-10">
            <a  className='text-xl'href="/">Home</a>
            <a className='text-xl'href="./profile">Profile</a>
            <a className='text-xl'href="./checkout">Check Out</a>
            <a className='text-xl'href="./order">Your Order</a>
            <a className='text-xl'href="">Order Invoice</a>
            <a className='text-xl'href="./">Terms And Services</a>
            <a className='text-xl'href="/">Privacy and Policy</a>
            <a className='text-xl'href="">Need Help</a>
           
        </div>
        <div className="my-24"> <a onClick= {() => setIsLogoutOpen(true)} className='text-xl ' href="">Log Out</a></div>
       </div>
      </Drawer>
    </>
  );
};

export default App;
