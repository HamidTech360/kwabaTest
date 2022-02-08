import React from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import SignUp from './pages/signUp/signup';
import Login from './pages/login/login';
import User from './pages/user/user'

import store from './store/store'

import ScrollToTop from './components/scrollToUp/scroll';
function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/user/*" element={<User/>}/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
