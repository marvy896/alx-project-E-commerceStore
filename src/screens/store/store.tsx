import React, { useEffect, useState } from "react";
import { products } from "../../interface/interface";
import "./store.css";
import Button from "react-bootstrap/Button";
import StoreItems from "../../hooks/storeInterface";
import useCart from "../../hooks/hooks";

export default function Store() {
  const [storeData, setStore] = useState<products[]>([]);
  let cartinNav= useCart()
  let quantityCart = cartinNav.getTotalquantity()
  
  useEffect(() => {
    fetch("http://localhost:4000/store")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setStore(data.StoreData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);


  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Thavmasios Hairs</h1>
        <h3>My Hair My Pride!</h3>
      </div>
      <div> No. of Products bought {quantityCart}</div>
      <div className="store-Items">
        {storeData.map((storeItem) => (
          <div key={storeItem._id} className="product">        
            <div key={storeItem.id}>
              <StoreItems {...storeItem} />
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="lg">
        Cart
      </Button>
    </div>
  );
}
