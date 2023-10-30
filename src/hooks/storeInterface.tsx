import React, { useEffect } from "react";
import useCart from "./hooks";
// import shoes from "../imagepage/shoes.jpg";

export interface IItem {
  id: number;
  productName: string;
  url: string;
  price: number;
  description: string;
}

export type StoreItemProps = {
  id: number;
  productName: string;
  url: string;
  price: number;
  description: string;
};

export default function StoreItems({
  id,
  productName,
  price,
  url,
  description,
}: IItem) {
  let carts = useCart();
  let quantity = carts.getQuantity(id, productName);
  let addToCart = () => {
    carts.increaseQuantity(id, productName, price);
  };
  let removefromCart = () => {
    carts.decreaseQuantity(id, productName);
  };
  let removeProduct = () => {
    carts.removeProduct(id);
  };
  return (
    <div className="store-container">
      <div className="store-inner">
        <div className="product">
          <div className="img-product">
            <img src={url} />
          </div>
          <div>ID: {id}</div>
          <div>Product Name: {productName}</div>
          <div>Price: {price}</div>
          <div>Description: {description}</div>
        </div>
        <div className="price-container">
          {quantity === 0 ? (
            <div className="cartbuttonDiv">
              <button className="cartbutton" onClick={addToCart}>
                + Add To Cart
              </button>
            </div>
          ) : (
            <div className="price-container">
              <div className="pricesbutton">
                <button className="add-sub" onClick={removefromCart}>
                  -
                </button>
                <div className="inCart">
                  {" "}
                  <span>{quantity}</span> in cart
                </div>
                <button className="add-sub" onClick={addToCart}>
                  +
                </button>
              </div>
              <div className="divremovebtn">
                <button className="removebtn" onClick={removeProduct}>
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
