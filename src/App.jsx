import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
// import { MovieDetail } from "./components/moviedetail/MovieDetail";
import { Person } from "./components/Person/Person";
// import {Tredding} from "./components/Treding/Tredding";
// import { Discover } from "./components/TV/Discover";
// import { People } from "./components/People/People";
// import { DiscoverDetail } from "./components/TVDetail/DiscoverDetail";
// import { Seasons } from "./components/TV/Session/Seasons";
// import  Search  from "./components/Search/Search";
//TV
import { Discover } from "./components/TV/Discover";
export function App() {
  return (
    
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/discover/tv" component={Discover} /> */}
        {/* <Route path="/tv/:id" component={DiscoverDetail} /> */}
        {/* <Route path="/trending/all/day" component={Tredding} /> */}
        {/* <Route path="/people/popular" component={People} /> */}
        {/* <Route path="/movie/:id" component={MovieDetail} /> */}
        <Route path="/person/:id" component={Person} />
        {/* <Route path="/search" component={Search} /> */}
        {/* <Route path="/session/:id/seasons" component={Seasons} /> */}
      </Switch>
    </main>
  );
}

export default App;