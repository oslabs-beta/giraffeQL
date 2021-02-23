import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({});
  const [diagram, setDiagram] = useState({});
  
  const storeUser = user => {
    setUser(user);
  }

  const logout = () => {
    setUser({});
  }

  const loadDiagram = newDiagram => {
    setDiagram(newDiagram);
  }

  return (
    <UserContext.Provider value={{ user, storeUser, logout, loadDiagram }} >
      {props.children}
    </UserContext.Provider>
  );
}

export default Provider;