import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";

export function App() {
  return (
    
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </main>
  );
}

export default App;