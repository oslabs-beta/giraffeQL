import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({userName: 'donkus'});

  const storeUser = user => {
    setUser({ userName: user.userName})
  }

  const logout = () => {
    setUser({});
  }

  return (
    <UserContext.Provider value={{ user, storeUser }} >
      {props.children}
    </UserContext.Provider>
  );
}

export default Provider;