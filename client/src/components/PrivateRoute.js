import {Navigate, Outlet} from 'react-router-dom';
import React, {useContext} from 'react';
import {AuthContext} from '../firebase/Auth';

const PrivateRoute = () => {
  const {currentUser} = useContext(AuthContext);

  try {
    if (currentUser) {
      return <Outlet />
    }
    return <Navigate to='/login' />
  } catch (error) {
    console.log(error)
  }
};

export default PrivateRoute;
