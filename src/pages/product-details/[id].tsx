import { RootState } from "@/redux/store";
import { ProductTypes } from "@/types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CartButton from "@/components/CartButton";
import Items, { ProductCard } from "@/components/Items";
import { products } from "@/components/Products";
import { useDispatch } from "react-redux";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { addToCart, decrement, increment } from "@/redux/slices/cartSlice";
import Image from "next/image";

function Dynamicpage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { id } = router.query;

  const Cart = useSelector((state: RootState) => state.cart.cart);
  const item = Cart.find((item) => item.id === id);

  const product = products.find((product) => product.id === id);

  const name = product?.name;
  const category = product?.category;
  const count = product?.count;
  const details = product?.detail;
  const images = product?.images;
  const price = product?.price;

  let categories = products.filter((item) => item.category === category);

  const foundProduct = categories.filter((item) => item.id !== id);

  // const relatedItem = categories.find((item) => item === category)

  const addItemToBasket = () => {
    const newItem = {
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
    dispatch(increment(item?.id));
  };

  const decrementItem = () => {
    dispatch(decrement(item?.id));
  };

  const cartProductCount = (id: any) => {
    const product = Cart.find((item) => item.id === id);
    if (!product) return 0;
    return product.count;
  };

  return (
    <div className="product-container">
      <CartButton />
      <div className="product-banner-container">
        <div className="product-carousel-container">
          <div className="product-carousel">
            <Carousel
              infiniteLoop
              showStatus={false}
              showIndicators={false}
              showThumbs={true}
              interval={2000}
            >
              <div className="product-image">
                <img loading="lazy" src={product?.images[0]} alt="" />
              </div>
              <div className="product-image">
                <img loading="lazy" src={product?.images[0]} alt="" />
              </div>
              <div className="product-image">
                <img loading="lazy" src={product?.images[0]} alt="" />
              </div>
              <div className="product-image">
                <img loading="lazy" src={product?.images[0]} alt="" />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="product-details-container">
          <div className="product-details">
            <div>
              <h1>{product?.name}</h1>
              <h2>${product?.price}</h2>
            </div>

            <div>
              <p>{product?.detail}</p>
            </div>
            <div className="inc-and-dec-container w-64">
              {!item ? (
                <button className="add-to-cart  " onClick={addItemToBasket}>
                  Add To Cart
                </button>
              ) : (
                <div className="inc-and-dec">
                  <button onClick={decrementItem}>
                    <MinusOutlined size={50} />
                  </button>
                  <h3>{cartProductCount(id)}</h3>
                  <button onClick={incrementItem}>
                    <PlusOutlined size={50} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-4xl p-10 pl-16">Related Items</h1>
      <div className="pro">
        {foundProduct.map((product: any) => (
          <DynamicpageCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
export default Dynamicpage;

type Props = {
  product: ProductTypes;
};

const DynamicpageCard = ({
  product: { images, name, price, id, category, count, details },
}: Props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const changedProductSize = router.pathname === "/";

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

  return (
    <div>
      <div className="products-changed-details-container">
        <Image
          className="item-image"
          src={images[0]}
          alt="product image"
          width={220}
          height={150}
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
    </div>
  );
};
