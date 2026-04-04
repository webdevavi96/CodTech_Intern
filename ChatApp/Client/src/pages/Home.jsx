import React from "react";
import { Card } from "../components/components.js";

function Home() {
  return (
    <div className="space-y-2">

      <Card
        name="Jerry"
        message="Hey there!"
        time="Online"
        avatar="https://i.pravatar.cc/101"
        variant="default"
      />

      <Card
        name="Lucy"
        message="Are you free tonight?"
        time="Now"
        avatar="https://i.pravatar.cc/102"
        variant="active"
      />

      <Card
        name="Joe Pr."
        message="Hola!"
        time="Yesterday"
        avatar="https://i.pravatar.cc/103"
        variant="muted"
      />
    </div>
  );
}

export default Home;