import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
import Store from "./store/store";
import { IItem } from "../interface/interface";

type HomeProps = {
  user: string;
};

export default function Home({ user }: HomeProps) {
  const [searchResults, setSearchResults] = useState<IItem[]>([]);

  const handleSearch = (searchText: string) => {
    fetch(`http://localhost:4000/search?query=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error("Search error:", error);
      });
  };


  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <Store user={user} textDisplay={searchResults} sortItems={""} />
    </div>
  );
}
