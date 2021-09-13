import './App.css';
import Home from './views/Home'
import AddRecipe from './views/AddRecipe'
import InfoRecipe from './views/InfoRecipe'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-recipe" exact component={AddRecipe} />
        <Route path="/recipe/:id" component={InfoRecipe} />
      </Switch>

    </Router>
  );
}

export default App;