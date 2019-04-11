import { connect } from 'react-redux';
import Cart from './cart';
import { fetchCart } from '../../actions/cart_actions';
import { fetchCurrentCartID } from '../../actions/session_actions';


const msp = state => {
    const currentUser = state.entities.users[state.session.id];
    
    let cart;
    if (Object.values(state.entities.carts).length > 0) {
        cart = Object.values(state.entities.carts)[0];
    } else {
        cart = [];
    }

    let cartItems;
    if (Object.values(state.entities.cartItems).length > 0) {
        cartItems = Object.values(state.entities.cartItems);
    } else {
        cartItems = [];
    }

    let products;
    if (Object.values(state.entities.products).length > 0) {
        products = Object.values(state.entities.products);
    } else {
        products = [];
    }

    return({
        currentUser,
        cart,
        cartItems,
        products
    })
}

const mdp = dispatch => {
 

    return({
        fetchCart: (user, id) => dispatch(fetchCart(user, id)),
        fetchCurrentCartID: (user) => dispatch(fetchCurrentCartID(user))
    })
}

export default connect(msp, mdp)(Cart);