import React from "react";
import { DataProps, FilterProps, ProductTypes } from "@/types";
import Image from "next/image";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { products } from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increment, decrement } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { Carts } from ".";

const Items: React.FC<{ filteredProducts?: any }> = ({ filteredProducts }) => {

  const router = useRouter();

  return (
    <div  className="products-container">
      {filteredProducts?.length !== 0 && products.length !== 0
        ? filteredProducts
          ? filteredProducts.map((product: ProductTypes) => (
              <ProductCard key={product?.id} product={product} />
            ))
          : products.map((product: any) => (
              <ProductCard key={product?.id} product={product} />
            ))
        : "No product found"}
    </div>
  );
};

export default Items;

type Props = {
  product: ProductTypes;
};

export const ProductCard = ({
  product: { images, name, price, id, category, count, details },
}: Props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const changedProductSize = router.pathname === '/'

  const handleClick = () => {
    router.push(`/product-details/${id}`);
  };

 
  const Cart = useSelector((state: RootState) => state.cart.cart);

  const productz = Cart.find((item: any) => item.id === id);
  const addItemToBasket = () => {
    const newItem: ProductTypes = {
      id,
      name,
      category,
      count,
      details,
      images,
      price,
    };
    dispatch(addToCart(newItem));
  };

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
  <h1 className="text-4xl p-10 pl-16">Related Items</h1>

  return (
    <div className={changedProductSize ? 'products-details-container' : 'products-changed-details-container'}>
      <Image
        className="item-image"
        src={images[0]}
        alt="product image"
        width={220}
        height={150}
        onClick={handleClick}
      />
      <div className="products-details">
        <h3>{name}</h3>
        <strong>${price}</strong>
        <div className="inc-and-dec-container">
          {!productz ? (
            <button className="add-to-cart" onClick={addItemToBasket}>
              Add To Cart
            </button>
          ) : (
            <div className="inc-and-dec">
              <button onClick={decrementItem}>
                <MinusOutlined size={50} />
              </button>
              <h2>{cartProductCount(id)}</h2>
              <button onClick={incrementItem}>
                <PlusOutlined size={50} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
