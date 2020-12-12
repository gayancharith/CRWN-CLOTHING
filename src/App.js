import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/homepage/homepage.component";

const HatsDetails = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
);

const TopicsList = () => (
  <div>
    <h1>Topic List</h1>
  </div>
);

const TopicDetails = (props) => {
  console.log({ props });
  return (
    <div>
      <h1>Topic Detail page {props.match.params.topicId}</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/topics" component={TopicsList} />
        <Route path="/topics/:topicId" component={TopicDetails} />
        <Route path="/hats" component={HatsDetails} />
      </Switch>
    </div>
  );
}

export default App;
