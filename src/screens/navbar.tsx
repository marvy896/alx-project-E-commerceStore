import React, { FormEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IItem } from "../interface/interface";
import { error } from "console";

type NavBarProps = {
  onSearch: (searchText: string) => void; // Pass a callback for handling search
};

export default function NavBar({ onSearch }: NavBarProps) {
  const [storeItems, setStoreItems] = useState<IItem[]>([]);
  const [sortItems, setSortItems] = useState<string>("");
  const [text, setText] = useState<string>("");

  const SortPrd = (itemsArray: IItem[] = storeItems) => {
    let sortPrd: IItem[] = itemsArray.slice(); // Make a copy of the itemsArray
    if (sortItems === "LH") {
      sortPrd.sort((a, b) => a.price - b.price);
    } else if (sortItems === "HL") {
      sortPrd.sort((a, b) => b.price - a.price);
    } else if (sortItems === "AZ") {
      sortPrd.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortItems === "ZA") {
      sortPrd.sort((a, b) => b.productName.localeCompare(a.productName));
    }
    return sortPrd;
  };
  
  const searchProducts = (e: FormEvent) => {
    e.preventDefault();
    const searchPrd = storeItems.filter((x) => {
      return (
        (x.productName || "")
          .toUpperCase()
          .includes((text || "").toUpperCase()) ||
        false ||
        (x.price && x.price <= parseInt(text))
      );
    });
    onSearch(text); // Pass the search text to the parent component
    SortPrd(searchPrd);
  };

  const GetProducts = async (callback) => {
    try {
      const response = await fetch("http://localhost:4000/store");
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      callback(null, data.StoreData);
    } catch (error) {
      console.error("Fetch error:", error);
      callback(error, null);
    }
  };
  

  GetProducts((error, data) => {
    if (error) {
      // Handle the error here
      console.error("Error fetching data:", error);
    } else {
      // Update the state with the data
      setStoreItems(data);
    }
  });
   

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Thavmasios Hair
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchProducts}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          {/* <div>
            <select
              value={sortItems}
              onChange={(e) => setSortItems(e.target.value)}
            >
              <option value="">--Please choose an option--</option>
              <option value="HL">By Price: Highest to Lowest</option>
              <option value="LH">By Price: Lowest to Highest</option>
              <option value="AZ">By Name: A-Z</option>
              <option value="ZA">By Name: Z-A</option>
            </select>
          </div> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
