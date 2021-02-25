import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const Provider = (props) => {

  const [user, setUser] = useState({});
  const [diagrams, setDiagrams] = useState([]);
  
  const storeUser = user => {
    setUser(user);
  }

  const logout = () => {
    setUser({});
    setDiagrams([]);
  }

  const storeDiagrams = diagrams => {
    setDiagrams(diagrams);
  }

  return (
    <UserContext.Provider value={{ user, storeUser, logout, diagrams, storeDiagrams }} >
      {props.children}
    </UserContext.Provider>
  );
}

export default Provider;