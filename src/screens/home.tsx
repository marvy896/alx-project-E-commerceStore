import React, { useEffect } from "react";
import NavBar from "./navbar";
import Store from "./store/store";

export default function Home() {
   return (
    <div>
      <NavBar />
      <Store />
    </div>
  );
}
