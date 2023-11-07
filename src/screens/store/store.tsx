import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import StoreItems from "../../hooks/storeInterface";
import useCart from "../../hooks/hooks";
import { IItem, products } from "../../interface/interface";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./store.css";

type StoreProps = {
  user: string;
  textDisplay: IItem[];
  sortItems: string;
};

export default function Store({ user, textDisplay, sortItems }: StoreProps) {
  const [storeData, setStore] = useState<products[]>([]);
  const cartinNav = useCart();
  const quantityCart = cartinNav.getTotalQuantity();

  useEffect(() => {
    if (textDisplay.length === 0) {
      fetch("http://localhost:4000/store")
        .then((res) => {
          if (!res.ok) {
            throw Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data: { StoreData: products[] }) => {
          setStore(data.StoreData);
        })
        .catch((error: Error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [textDisplay]);

  // Filter products based on search criteria
  const filteredProducts = textDisplay.length > 0 ? textDisplay : storeData;

  // Sort products based on sorting option
  const sortProducts = (productsArray: IItem[]) => {
    if (sortItems === "LH") {
      return productsArray.sort((a, b) => a.price - b.price);
    } else if (sortItems === "HL") {
      return productsArray.sort((a, b) => b.price - a.price);
    } else if (sortItems === "AZ") {
      return productsArray.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (sortItems === "ZA") {
      return productsArray.sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    } else {
      return productsArray;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Thavmasios Hairs</h1>
        <h3>My Hair My Pride!</h3>
        <h3>{user ? `Welcome, ${user}` : "Not logged in"}</h3>
      </div>
      <div>No. of Products bought {quantityCart}</div>
      <div className="store-page">
        <div className="store-Items">
          {sortedProducts.map((storeItem) => (
            <div key={storeItem._id} className="store-item">
              <StoreItems {...storeItem} user={user} />
            </div>
          ))}
        </div>
      </div>
      <Nav.Link as={Link} to="/cart">
        <Button variant="secondary" size="lg">
          {user} continue to Cart
        </Button>
      </Nav.Link>
    </div>
  );
}
