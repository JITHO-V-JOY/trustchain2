import React, { useCallback, useContext, useState,} from "react";

import {useDispatch} from 'react-redux';
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./auth.js";
import history from './history';
import {incStatus, loadTrustChainData, payForRequested, addRequest, addUser} from '../redux/ActionCreater';


const Login = ()=> {
  const[Role, setRole] = useState("village-officer")
  const dispatch = useDispatch()
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          history.push("/home");
          dispatch(addUser(Role))
      } catch (error) {
        dispatch(addUser("user"))
        dispatch(loadTrustChainData())
        alert(error);
      }
    },
    
  );


  const handleChange = (event)=>{
    let value = event.target.value;
    console.log(value)
    setRole(value);
    console.log(Role)
  }

//  const { currentUser } = useContext(AuthContext);
/*
  if (currentUser) {
    return <Redirect to="/" />;
  }
  */

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
         
          <input name="email" type="role" placeholder="Email" />
        </label>
        <br/>
        <br/>
        <label>
          Role
          <select name = "role" value={Role} onChange = {handleChange}>
          <option value="decision-maker">Decision Maker</option>
          <option value="village-officer">Village Officer</option>
          </select>
        </label>
        <br/>
        <br/>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br/>

        <br/>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
