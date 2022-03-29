import React from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
