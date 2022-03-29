import React from 'react';

//components
import AppHeader from '../../components/Header/header';
import HomeBanner from './components/banner';
import Categories from './components/categories';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'font-awesome/css/font-awesome.css';
import './css/home.css'

const Home = () => {
    return ( 
        <div className="home-page">
            <AppHeader/>
            <HomeBanner/>
            <Categories/>
        </div>
     );
}
 
export default Home;