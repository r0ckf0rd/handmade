import { RECEIVE_CART_ITEM, REMOVE_CART_ITEM } from '../../../actions/cart_item_actions';
import { RECEIVE_CART } from '../../../actions/cart_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../../../actions/session_actions';


const CartItemsReducer = (oldState = {}, action) => {

    Object.freeze(oldState);
    let newState = merge({}, oldState);

    switch (action.type) {
        case RECEIVE_CART_ITEM:
            newState = merge(newState, action.cartItem);
            return newState;

        case REMOVE_CART_ITEM:
            delete newState[action.cartItemId];
            return newState;

        case RECEIVE_CART:
            newState = merge(newState, action.cartItems);
            return action.cartItems;

        case LOGOUT_CURRENT_USER:
            return {};

        default:
            return oldState;
    }

}

export default CartItemsReducer;