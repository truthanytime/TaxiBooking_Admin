import React, { useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import LoadingOverlay from 'react-loading-overlay';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { setAdmin, setChecking } from "../actions"
import ServerAPI from "../api";


const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const location = useLocation();
  const history = useHistory();
  const checking = useSelector(state => state.user.checking);
  const dispatch = useDispatch();
  const admin = useSelector(state => state.user.admin);

  useEffect(() => {
    dispatch(setChecking(true)); 
    if(admin){
      dispatch(setChecking(false)); 
      return;
    }
    const token = localStorage.getItem('accessToken');
    if (!token || typeof token === "boolean") {
      history.push("/auth-login");
      return;
    }
    if (!admin) {
      ServerAPI.post('/api/auth/admin-signin-with-token').then(
        res => {
          if(res.data.success){
            dispatch(setAdmin(res.data.body))
          }
          dispatch(setChecking(false)); 
        }
      ).catch(e=>{
        history.push("/auth-login");
      })
    }
  }, [])
  return ( // eslint-disable-line
    <LoadingOverlay active={checking} spinner>
      <Route
        exact={exact ? true : false}
        rest
        render={(props) =>
          <Component {...props} {...rest}></Component>
        }
      ></Route>
    </LoadingOverlay>
  )
};

export default PrivateRoute;
