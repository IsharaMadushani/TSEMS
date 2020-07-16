import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbconfig from "./config/firebaseconfig";
// core components
import Admin from "layouts/Admin.jsx";
import ManagementStaff from "layouts/ManagementStaff.jsx"
import RTL from "layouts/RTL.jsx";
import SignIn from "./views/SignIn/SignIn";

// import AddWorker from "./views/UserProfile/UserProfile"

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();
// const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(reduxThunk.withExtraArgument({ getFirebase })),
    reactReduxFirebase(fbconfig, { attachAuthIsReady: true })
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          {/* <Route exact path="/" component={SignIn} /> */}
          <Route path="/admin" component={Admin} />
          <Route path="/managementstaff" component={ManagementStaff} />
          <Route path="/rtl" component={RTL} />
          <Route path="/signin" component={SignIn} />
          {/* <Route path="admin/workers/add" component={AddWorker} /> */}
          {/* <Redirect from="/" to="/admin/dashboard" /> */}
          <Redirect from="/" to="/signin" />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );  
});
