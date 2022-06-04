import {useState} from 'react';

import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";


export function App(){
  const [user, setUser] = useState(null);

  if (user) return <Home loggedUser={user}/>

  // Rudimentar routes control
  return window.location.pathname === '/signup' 
    ? (<Signup signInUser={setUser}/>)
    : (<Login signInUser={setUser} />)
}