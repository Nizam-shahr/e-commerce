import Empty from '@/components/Icon/Empty';
import { RootState } from '@/redux/store';
import { ProductTypes } from '@/types';
import React, {useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { DeliveryAddress } from '@/components';
import { types } from 'util';
import { Radio } from '@/components';
import Delivery from '@/components/delivery/Delivery';
import Contact from '@/components/contacts/Contacts';
import {DeliverySchedule} from '@/components';

function checkout() {

   
  const Cart = useSelector((state: RootState) => state.cart.cart);
 

  return (
    <div className='checkout-container'>
      <div className='checkout-left'>
          <Delivery/>
        <Contact/>
        <DeliverySchedule/>
        <div><h1 className='font-bold'>Delivery Schedule</h1></div>
        <div><h1 className='font-bold'>Payment</h1></div>
      </div>
      <div className='checkout-right px-16'>
                <h1 className='text-3xl pb-8'>Your Order</h1>
                <div className='checkout-item-container'> 
                {Cart.length === 0 ? <Empty/> : Cart.map((item) => (
                        <CheckoutCard item={item}/>
                    ))}
                </div>           
      </div>
    </div>
  )
}

export default checkout

type Props = {
        item: ProductTypes;
}

const CheckoutCard = ({
    item: { images, name, price, id, category, count, details },
  
  }: Props) => {
    const Cart = useSelector((state: RootState) => state.cart.cart);
    const cartProductCount = (id: any) => {
        const product = Cart.find((item) => item.id === id);
        if (!product) return 0;
        return product.count;
      };
      const priceNum =parseFloat(price)
  const itemTotal = cartProductCount(id) * priceNum

        return (
            <div className='checkout-item'>
                                <h2 className='font-bold'>{count}</h2>
                                <span className='text-gray-400'>X</span>
                                <h3 className='text-gray-400'>{name}</h3>
                                <span>|</span>
                                <h3 className='text-gray-400'>${price}</h3>
                                <h3 className='px-4'>${itemTotal}</h3>
                        </div>
        )
}
