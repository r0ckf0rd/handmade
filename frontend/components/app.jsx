import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, FullPageRoute } from '../util/route_util';
import Modal from './modal/modal_container';
import NavBar from './nav_bar/nav_bar_container';
import Footer from "./footer/footer_container";
import ProductIndex from './products/product_index_container';
import ProductShow from './products/product_show_container';
import ShopManager from './products/shop_manager_container';
import AddListingForm from './products/create_product_form_container';
import UpdateListingForm from './products/update_product_form_container';
import Splash from './splash/splash_container';
import CreateShop from './products/create_shop_container';
import Cart from './carts/cart_container';


const App = () => (
  <>
    <Modal/>
    <div className="nav-bar-container"> 
      <NavBar/>
    </div>
    <div className="top-level-container">
      <Route exact path="/" component={Splash}/>
      <ProtectedRoute path="/products" exact={true} component={ProductIndex} />
      <Route exact path="/products/:id" component={ProductShow}/>
      <ProtectedRoute path="/createShop/" exact={true} component={CreateShop}/>
      <ProtectedRoute path="/addListing" exact={true} component={AddListingForm}/>
      <ProtectedRoute path="/updateListing/:id" exact={true} component={UpdateListingForm}/>
    </div>

    <div className="full-page-view">
      <FullPageRoute path="/shopManager" exact={true} component={ShopManager}/>
      <ProtectedRoute path="/myCart" exact={true} component={Cart} />
    </div>
    
    <div className="top-level-container">
        <Footer/>
    </div>
  </>
);

export default App;

