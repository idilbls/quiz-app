import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Play from './components/quiz/Play';

function App() {
  return (
    <Router>
      <Route path="/" exact component = {Home} />
      <Route path="/play" exact component = {Play} />
    </Router>
  );
}

export default App;
