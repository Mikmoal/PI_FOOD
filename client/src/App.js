import './App.css';
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from './components/Detail';
import NewRecipe from './components/NewRecipe';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
       <Route exact path="/" component={LandingPage} />
       <Route exact path="/home" component={Home} />
       <Route exact path="/home/:id" element={Detail} />    
       <Route exact path="/newRecipe" element={NewRecipe} />
     </BrowserRouter>
  );
}

export default App;
