import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal_container';
import NavBar from './nav_bar/nav_bar_container';
import Footer from "./footer/footer_container";
import ProductIndex from './products/product_index_container';
import ProductShow from './products/product_show_container';


const App = () => (
  <>
    <Modal/>
    <div className="nav-bar-container"> 
      <NavBar/>
    </div>
    <div className="top-level-container">
      <Route exact path="/" component={null}/>
      <ProtectedRoute path="/products" exact={true} component={ProductIndex} />
      <Route exact path="/products/:id" component={ProductShow}/>
      <Footer/>
    </div>
  </>
);

export default App;

