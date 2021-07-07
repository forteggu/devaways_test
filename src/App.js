import "./App.css";
import GeneralRanking from "./Components/GeneralRanking/GeneralRanking";
import AutomaticView from "./Components/AutomaticView/AutomaticView";
import Header from "./Components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import RacePilotsView from "./Components/RacePilotsView/RacePilotsView";
import TeamsView from "./Components/TeamsView/TeamsView";

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
          <Route path="/racePilots">
            <RacePilotsView></RacePilotsView>
          </Route>
          <Route path="/teams">
            <TeamsView></TeamsView>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
