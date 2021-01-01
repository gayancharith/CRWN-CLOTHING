import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Homepage from "./pages/homepage/homepage.component";
import Shoppage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";

import GlobalStyle from "./global.styles";
// import "./App.css";

import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCollectionForPreview } from "./redux/shop/shop.selectors";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  // unsubscribeFromAuth = null;

  // componentDidMount() {
  // checkUserSession();
  // const { collectionArray } = this.props;
  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //   if (userAuth) {
  //     const userRef = await createUserProfileDocument(userAuth);
  //     userRef.onSnapshot((snapShot) => {
  //       // this.setState({
  //       //   currentUser: {
  //       // id: snapShot.id,
  //       // ...snapShot.data(),
  //       //   },
  //       // });
  //       this.props.setCurrentUser({
  //         id: snapShot.id,
  //         ...snapShot.data(),
  //       });
  //     });
  //   } else {
  //     // this.setState({ currentUser: userAuth });
  //     this.props.setCurrentUser(userAuth);
  //   }
  // });
  // addCollectionAndDocuments(
  //   "collections",
  //   collectionArray.map(({ title, items }) => ({ title, items }))
  // );
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={Shoppage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        {/* <Route path="/signin" component={SignInAndSignUpPage} /> */}
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
