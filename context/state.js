import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({});
  
  const storeUser = user => {
    setUser(user);
  }

  const logout = () => {
    setUser({});
  }

  return (
    <UserContext.Provider value={{ user, storeUser, logout }} >
      {props.children}
    </UserContext.Provider>
  );
}

export default Provider;