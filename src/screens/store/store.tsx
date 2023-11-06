import React, { useEffect, useState } from "react";
import { IItem, products } from "../../interface/interface";
import "./store.css";
import Button from "react-bootstrap/Button";
import StoreItems from "../../hooks/storeInterface";
import useCart from "../../hooks/hooks";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

type StoreProps = {
  user: string;
};

export default function Store({ user }: StoreProps) {
  const [storeData, setStore] = useState<products[]>([]);
  let cartinNav = useCart();
  let quantityCart = cartinNav.getTotalQuantity();

  useEffect(() => {
    fetch("http://localhost:4000/store")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data: { StoreData: products[] }) => {
        setStore(data.StoreData);
      })
      .catch((error: Error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Thavmasios Hairs</h1>
        <h3>My Hair My Pride!</h3>
        <h3>{user ? `Welcome, ${user}` : "Not logged in"}</h3>
      </div>
      <div> No. of Products bought {quantityCart}</div>
      <div className="store-page">
        <div className="store-Items">
          {storeData.map((storeItem) => (
            <div key={storeItem._id}>
              <div key={storeItem.id}>
                <StoreItems {...storeItem} user={user} />
              </div>
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
