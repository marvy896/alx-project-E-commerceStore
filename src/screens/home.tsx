import React from "react";
import NavBar from "./navbar";
import Store from "./store/store";

type HomeProps = {
  user: string;
};

export default function Home({ user }: HomeProps) {
  return (
    <div>
      <NavBar />
      <Store user={user} />
    </div>
  );
}
