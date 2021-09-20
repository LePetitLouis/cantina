import './App.css';

// Components
import Home from './views/Home'
import AddRecipe from './views/AddRecipe'
import InfoRecipe from './views/InfoRecipe'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './views/NotFound'

import FilterContext from './services/filterContext'

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react';

function App() {

  const [listFilter, setListFilter] = useState({
    title: undefined,
    level: undefined,
    numberPerson: undefined,
    preparationTime: undefined
})

  const contextValue = {
    listFilter,
    updateFilter: setListFilter
  }

  return (
    <FilterContext.Provider value={contextValue}>
      <Router>

      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-recipe" exact component={AddRecipe} />
          <Route path="/recipe/:id" exact component={InfoRecipe} />
          <Route path="/edit-recipe/:id" exact component={AddRecipe} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <footer>
        <Footer />
      </footer>

      </Router>
    </FilterContext.Provider>
  );
}

export default App;