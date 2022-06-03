import {useState} from 'react';

import { Home } from "./Home";
import { Login } from "./Login";


export function App(){
  const [user, setUser] = useState(null);

  return user ? <Home/> : <Login signInUser={setUser} />
}