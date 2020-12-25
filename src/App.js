import { Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/main/Main";
import Movie from './components/movie/Movie'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/random" render={(props) => <Movie {...props} />} />
        <Route path="/" render={(props) => <Main {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
