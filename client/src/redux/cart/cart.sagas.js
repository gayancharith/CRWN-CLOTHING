import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";
import { clearCart, setCartFromDatabase } from "./cart.actions";

import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

export function* updateCartInDatabase() {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser?.id) return;

  try {
    const newCartItems = yield select(selectCartItems);
    const userCartRef = yield getUserCartRef(currentUser.id);

    userCartRef.update({ cartItems: newCartItems });
  } catch (error) {
    console.log({ error });
  }
}

export function* getUserCart() {
  const currentUser = yield select(selectCurrentUser);
  const userCartRef = yield getUserCartRef(currentUser.id);
  const cartSnapshot = yield userCartRef.get();
  yield put(setCartFromDatabase(cartSnapshot.data().cartItems));
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onChangeCart() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartInDatabase
  );
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getUserCart);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onChangeCart),
    call(onSignInSuccess),
  ]);
}
