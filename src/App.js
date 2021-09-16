import './App.css';

// Components
import Home from './views/Home'
import AddRecipe from './views/AddRecipe'
import InfoRecipe from './views/InfoRecipe'
import Header from './components/Header'
//import Footer from './components/Footer'

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>

    <Header />

    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-recipe" exact component={AddRecipe} />
        <Route path="/recipe/:id" component={InfoRecipe} />
      </Switch>
    </main>

    </Router>
  );
}

export default App;