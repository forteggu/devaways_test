import "./App.css";
import GeneralRanking from "./Components/GeneralRanking/GeneralRanking";
import AutomaticView from "./Components/AutomaticView/AutomaticView";
import Header from "./Components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header headerText="Devaways Racing"></Header>
      <main className="mainContent">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/generalRanking" />}
          />

          <Route path="/generalRanking">
            <GeneralRanking></GeneralRanking>
          </Route>
          <Route path="/automaticView">
            <AutomaticView></AutomaticView>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
