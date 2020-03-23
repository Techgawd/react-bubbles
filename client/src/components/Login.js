import React, { useState }from "react";
import { withRouter } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const[entry, setEntry] = useState({
    credentials: {
      username:"", password: ""},
      isLoading: false
  })

 const handleChange = (e) => {
   e.preventDefault()
   setEntry({
     ...entry,
     credentials: {
       ...entry.credentials,
       [e.target.name]: e.target.value
     }
   });
 } 
  
 const handleLogin = (e) => {
   e.preventDefault();
   setEntry({
     ...entry,
     isLoading: true
   });
   axiosLogin(entry)
 } 

 const axiosLogin = e => {
   axiosWithAuth()
   .post('/login', e.credentials)
   .then(res => {
     localStorage.setItem('token', res.data.payload)
     setEntry({
       ...entry,
       isLoading: false
     });
     props.history.push('/profile')
   })
   .catch(err => console.log("Login Error", err.response))
 }

  return (
    <>
      <h1 id="header1">Welcome to the Bubble App!!</h1>
      <form onSubmit={handleLogin}>
    <label id="form1" htmlFor='username'>Username</label>
      <input
      type='text'
      name='username'
      onChange={handleChange}
      placeholder='username'
      value={entry.username}></input>
    <label htmlFor='password'>Password</label>
      <input
      type='password'
      name='password'
      onChange={handleChange}
      placeholder='Password'
      value={entry.password}></input>
    <button>{entry.isLoading ? "Loading" : "Login"}</button>  
      </form>
    </>
  );
};

export default withRouter (Login);
