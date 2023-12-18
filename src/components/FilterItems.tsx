"use client";
import React, { useState } from "react";
import { Button, Divider, Drawer, Radio, Space } from "antd";
import Image from "next/image";
import { ItemSelector } from ".";
import { DataProps,  FilterProps,  ProductTypes,  categoryTypes } from '@/types'
import {categories} from './filter/SideOption'
import { AiOutlineCloseCircle } from "react-icons/ai";

const FilterItems: React.FC<{ showPopUp: boolean; onClose: any , 
    onFilteredProducts : any 
     }> = ({
  showPopUp,
  onClose,
  onFilteredProducts

}) => {
  // const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  // const onChange = (e: RadioChangeEvent) => {
  //   setPlacement(e.target.value);
  // };
 


 
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
closeIcon ={null}
        // placement={placement}
        width={600}
        onClose={onClose}
        open={showPopUp}
      >
        <div onClick={()=> onClose(true)} className="absolute bg-white rounded-2xl p-2 mb-2 " style={{top: '-40px', left: '50vw'}}>  <AiOutlineCloseCircle/> </div>
      <div className='item-selectors'>
      {categories.map((item: categoryTypes, index: number) => (
        <Card key={index} data={item} onFilteredProducts={onFilteredProducts}/>
      ))}
    </div>


      </Drawer>
    </>
  );
};

export default FilterItems;

type Props ={
    data: categoryTypes;
    onFilteredProducts: any
  }

const Card = ({data:{Icon,category}, onFilteredProducts}:Props) => {
    return (
      <div className='item-selector-button-containers'>
        <button onClick={() => onFilteredProducts(category)} className="item-selector-buttons">
            <Icon />
            {category}
          </button>
      </div>
          
    )
  }
  