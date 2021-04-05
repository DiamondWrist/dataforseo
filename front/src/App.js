import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

import SearchScreen from "./screens/SearchScreen";
import ResultScreen from "./screens/ResultScreen";
import DetailResultScreen from "./screens/DetailResultScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/" component={SearchScreen} exact />
        <Route path="/results/" component={ResultScreen} />
        <Route path="/result/:id/:search" component={DetailResultScreen} />
      </Container>
    </Router>
  );
}

export default App;
