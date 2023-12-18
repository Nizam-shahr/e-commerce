"use client";
import { Carts } from ".";
import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { useRouter } from "next/router";
import { increment, decrement, removeFromCart } from "@/redux/slices/cartSlice";
import { ShoppingOutlined } from "@ant-design/icons";
import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Empty from "./Icon/Empty";

const App: React.FC<{ showPopUp: boolean; onClose: any }> = ({
  showPopUp,
  onClose,
}) => {
  // const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  // const onChange = (e: RadioChangeEvent) => {
  //   setPlacement(e.target.value);
  // };
  const Cart = useSelector((state: RootState) => state.cart.cart);
  const cartTotal = Cart.reduce(
    (total, item: any) => (total += item.price * item.count),
    0
  );
  const router = useRouter()
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
      placement="bottom"
   
        title={
          <div className="flex  justify-between items-center">
            <ShoppingOutlined className="h-7 text-primary text-yellow-500 font-bold" />


            <h3 className="text-black font-pop font-medium text-[15px] text-yellow-500 font-bold ">
              {Cart.length} Item
              {Cart.length > 1 ? "s" : ""}
            </h3>
          </div>
        }
        // placement={placement}
        width={600}
        onClose={onClose}
        open={showPopUp}
      >
        {Cart.length !== 0 ?    <Carts /> : <div className="empty-cart"><Empty /><h2 className="text-xl">No Products Found</h2> </div>  }
     

        <Button
         onClick={()=> router.push('/checkout')}
          disabled={Cart.length === 0}
          className=" checkout-button-container mt-auto fixed bottom-1 w-[550px] "
        >
          <span className=" checkout text-lg text-white font-pop font-semibold">
            Checkout
          </span>
          <span className="cart-total bg-white h-9 w-[200px] text-primary ">
            ${cartTotal}.00
          </span>
        </Button>
      </Drawer>
    </>
  );
};

export default App;
