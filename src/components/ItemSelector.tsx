
import React from 'react'
import { data } from './data'
import Image from 'next/image'
import { DataProps,  FilterProps,  ProductTypes,  categoryTypes } from '@/types'
import {categories} from './filter/SideOption'

type filterItemProps = {
    onFilteredProducts : any
}

const ItemSelector = ({onFilteredProducts}: filterItemProps) => {

 
  return (
    <div className='item-selector'>
      {categories.map((item: categoryTypes, index: number) => (
        <Card key={index} data={item} onFilteredProducts={onFilteredProducts}/>
      ))}
    </div>
  )

 
}

export default ItemSelector


type Props ={
  data: categoryTypes;
  onFilteredProducts: any
}



const Card = ({data:{Icon,category}, onFilteredProducts}:Props) => {
  return (
    <div className='item-selector-button-container'>
      <button onClick={() => onFilteredProducts(category)} className="item-selector-button">
          <Icon />
          {category}
        </button>
    </div>
        
  )
}
