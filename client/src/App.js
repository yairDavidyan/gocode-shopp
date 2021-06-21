import "./App.css";
import { Route, Switch } from "react-router";
import Information from "./views/Information";
import Home from "./components/Home";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/product/:id">
        <Information />
      </Route>
    </Switch>
  );
}
export default App;
