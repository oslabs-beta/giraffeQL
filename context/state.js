import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({});
  // const [mongoId, setMongoId] = useState({mongoId: null})

  
  const storeUser = user => {

    console.log(user)

    setUser(user);
    // setMongoId({ mongoId: user._id});
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