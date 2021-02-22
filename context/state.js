import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({username: null});
  const [mongoId, setMongoId] = useState({mongoId: null})

  const storeUser = user => {
    setUser({ userName: user.username});
    setMongoId({ mongoId: user._id});
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