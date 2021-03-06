import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


// renders component if logged out, otherwise redirects to the root url
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
            )
    )} />
);

// renders component if logged in, otherwise redirects to the login page
const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
            )
    )} />
);

const Shop = ({ component: Component, path, loggedIn, createdShop, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        (loggedIn && createdShop) ? (
            <Component {...props} />
        ) : (
            <Redirect to="/createShop" />
            )
    )} />
);

// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
    const loggedIn = Boolean(state.session.id);
    let createdShop;
    
    if (loggedIn) {
        createdShop = Boolean((state.entities.users[state.session.id].shop_name));
    } else {
        createdShop = null;
    }

    return ({ 
        loggedIn,
        createdShop
    });
}

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));


export const FullPageRoute = withRouter(connect(mapStateToProps)(Shop));
