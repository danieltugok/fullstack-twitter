import {useState} from 'react';

import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";


export function App(){
  const [user, setUser] = useState(null);

  if (user) {
    return <Home />
  }

  // Rudimentar routes control
  return window.location.pathname === '/signup' 
    ? (<Signup signInUser={setUser}/>)
    : (<Login signInUser={setUser} />)

  // return <Signup />
  // return user ? <Home/> : <Login signInUser={setUser} />
}