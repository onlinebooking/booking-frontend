import { omit } from 'lodash';
import { replace } from 'react-router-redux';
import { loginWithToken, showModalLogin } from '../actions/auth';

// Login user with persistent local storage jwt token
function loginUserWithLocalStorageToken(store) {
  const existingUserToken = localStorage.getItem('user_token');
  if (existingUserToken) {
    store.dispatch(loginWithToken(existingUserToken));
  }
}

function showModalLoginFromQueryString(store) {
  // Authenticated user can't logged anymore
  if (!store.getState().auth.token) {
    const query = store.getState().routing.locationBeforeTransitions.query;
    const { loginOpenModal /*, loginEmail*/ } = query;

    if (loginOpenModal) {
      // Remove shit from url
      const newQuery = omit(query, ['loginOpenModal', 'loginEmail']);
      store.dispatch(replace({ query: newQuery }));
      // Open modal
      store.dispatch(showModalLogin());
    }
  }
}

// Bootstrapping the store
export default function bootstrapStore(store) {
  loginUserWithLocalStorageToken(store);
  showModalLoginFromQueryString(store);
}
