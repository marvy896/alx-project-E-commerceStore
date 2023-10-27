import { text } from "express";
import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IItem } from "../interface/interface";

export default function NavBar() {
  let [storeItems, setStoreItems] = useState<IItem[]>([]);
  let [sortItems, setSortItems] = useState("");
  let [maintext, setMainText] = useState("");
  let [text, setText] = useState("");
  let [textDisplay, setTextDisplay] = useState<IItem[]>([]);

  //to sort prices
  const SortPrd = (itemsArray?: IItem[]) => {
    itemsArray = itemsArray || storeItems;
    let sortPrd: IItem[];
    if (sortItems == "LH") {
      sortPrd = itemsArray.sort((a, b) => a.price - b.price);
    } else if (sortItems == "HL") {
      sortPrd = itemsArray.sort((b, a) => a.price - b.price);
    } else if (sortItems == "AZ") {
      sortPrd = itemsArray.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (sortItems == "ZA") {
      sortPrd = itemsArray.sort((b, a) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (sortItems == "") {
      sortPrd = itemsArray;
    } else {
      throw new Error("Invalid sort option: " + sortItems);
    }
    console.log(sortPrd);
    return sortPrd;
  };

  const searchProducts = (e: FormEvent) => {
    e.preventDefault();
    let searchPrd = storeItems.filter(
      (x) =>
        x.productName.toUpperCase().includes(text.toUpperCase()) ||
        x.price <= parseInt(text)
    );
    setTextDisplay(SortPrd(searchPrd));
    setMainText(text);
  };

  let mappedArrays = maintext == "" ? storeItems : textDisplay;
  SortPrd(mappedArrays);

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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button variant="outline-success" onClick={searchProducts}>
              Search
            </Button>
          </Form>
          <div>
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
