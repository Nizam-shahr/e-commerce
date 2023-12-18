
import { decrement, increment, removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import {PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons'
import { ProductTypes } from "@/types";
import Image from "next/image";
import React, { use } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Empty from "./Icon/Empty";

const Cart = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.cart);
  const id = cartProducts.map((item) => item.id)
  const productz = cartProducts.find((item: any) => item.id === id);
  return (

  <div className="cart-item-container">
  {!productz ? cartProducts.map((items) => (
    <CartCard items={items}/>
  )) : <Empty/>}
  </div>
  )
};

export default Cart;

type Props = {
  items: ProductTypes;
};

const CartCard = ({
  items: { images, name, price, id, category, count, details },

}: Props) => {
  const dispatch = useDispatch();
  const Cart = useSelector((state: RootState) => state.cart.cart);

 
  
  const incrementItem = () => {
    dispatch(increment(id));
  };

  const decrementItem = () => {
    dispatch(decrement(id));
  };

  const cartProductCount = (id: any) => {
    const product = Cart.find((item) => item.id === id);
    if (!product) return 0;
    return product.count;
  };
const priceNum =parseFloat(price)
  const itemTotal = cartProductCount(id) * priceNum

  return (
   
    <div className="">
 <div className="cart-details-container">
  <div className="flex w-60"> 

  <div className="cart-inc-and-dec-container">
       
       <div className="cart-inc-and-dec">
         <button onClick={decrementItem}>
           <MinusOutlined size={50} />
         </button>
         <h2>{cartProductCount(id)}</h2>
         <button onClick={incrementItem}>
           <PlusOutlined size={50} />
         </button>
       </div>
   </div>
 <Image
   className="cart-image"
   src={images[0]}
   alt="product image"
   width={220}
   height={150}
 />
 <div className="cart-details">
   <h3>{name}</h3>
   <strong>${price}</strong>
   
 </div>
  </div>
     
      <div className="flex items-center">  <div className="item-amount">
        <strong>${itemTotal}</strong>
      </div>
      <button onClick={()=> dispatch(removeFromCart({id}))} className="close-cart p-2">
        <span><CloseOutlined size={200}/></span>
      </button> </div>
     
    </div>
    </div>
  );
};
