import axios from 'axios';
import { SIGN_UP, SIGN_IN, ROOT_URL} from '../constants';

//  register
export const signUp = user => {
  let url = ROOT_URL + '/user/signUp';
  axios.post(url, user).then(res => {
    user = res.data;
  });

  return {
    type: SIGN_UP,
    user,
  }
}

const LOGIN_URL = ROOT_URL + '/user/signIn';


//  login
export const signIn = user => {
  return (dispatch, getState) => {
    // const cache = sessionStorage.getItem(LOGIN_URL);
    axios.post(LOGIN_URL, user).then(res => {
      dispatch(handleSignIn(res.data.user));
      sessionStorage.setItem(LOGIN_URL, JSON.stringify(res.data.user));
      sessionStorage.setItem('token', res.data.token);
    });
    // if (cache) {
    //   console.log('fromcache');
    //   dispatch(handleSignIn(JSON.parse(cache)));
    // } else {
    //   console.log('fromfetch');
    //   axios.post(LOGIN_URL, user).then(res => {
    //     dispatch(handleSignIn(res.data));
    //     sessionStorage.setItem(LOGIN_URL,JSON.stringify(res.data));
    //   });
    // }
  }
}

export const logout = () => {
  const token = sessionStorage.getItem('token');
  let url = ROOT_URL + '/user/logout?token=';
  if (!token)
    return;
  url += token;
  return dispatch => {
    axios.get(url).then(res => {
      if (!res.data) return;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem(LOGIN_URL);
      dispatch(checkLogin());
    });
  }
}

export const checkLogin = () => {
  const token = sessionStorage.getItem('token');
  let url = ROOT_URL + '/user/check?token=';
  if (token) {
    url += token;
  }
  return dispatch => {
    axios.get(url).then(res => {
      if (!res.data) return;
      dispatch(handleSignIn(res.data));
    })
  }
}

const handleSignIn = user => ({
  type: SIGN_IN,
  user,
})

