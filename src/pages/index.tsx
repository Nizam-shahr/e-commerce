// pages/index.tsx
import React from 'react';
import { Banner, ItemSelector, Items } from '@/components';
import CartButton from '@/components/CartButton';
import { products } from '@/components/Products';
import {useState} from 'react'
import { DataProps, FilterProps, ProductTypes } from '@/types';
import { useSearch } from '../components/context/SearchContext';

const Home: React.FC = () => {
  const { searchProductByName, setSearchProductByName } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState<any>();

  const onFilteredProducts = (category: string) => {
   
    let filteredProduct = products.filter(
      (product: any) => product.category === category
    );
    setFilteredProducts(filteredProduct);
  };
  
  let filterByProductName = filteredProducts
      ? filteredProducts.filter((item: ProductTypes | any) => 
          
          item.name.toLowerCase()?.includes(searchProductByName.toLowerCase() ) 
        )
      : products.filter((item: ProductTypes | any) =>
          item.name.toLowerCase()?.includes(searchProductByName.toLowerCase())
        );
        
  return (
    <div>
      <CartButton />
      <div className="main-container">
        <div className="item-selector-container">
          <ItemSelector onFilteredProducts={onFilteredProducts} />
        </div>
        <div className="banner-items-container">
          <div className="banner-container">
            <Banner />
          </div>
          <div className="items-container">
            <Items filteredProducts={filterByProductName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

