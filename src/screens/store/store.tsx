import React, { useEffect, useState } from "react";
import { products } from "../../interface/interface";
import "./store.css"

export default function Store() {
  let [storeData, setStore] = useState<products[]>([]);

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
        console.log(data);
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
      <div className="store-Items">
        {storeData.map((storeItem) => (
          <div key={storeItem._id} className="product">
            <div>ID: {storeItem.id}</div>
            <div>Product Name: {storeItem.productName}</div>
            <div>Price: {storeItem.price}</div>
            <div>Description: {storeItem.description}</div>
            {/* You can add more fields here */}
            <img src={storeItem.url} alt={storeItem.productName} />
          </div>
        ))}
      </div>
    </div>
  );
}
