import { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ Email: '', Auth: false });
  const [room, setRoom] = useState({ Room: '', Subject: '' });

  const loginContext = (Email) => {
    setUser((user) => ({
      Email: Email,
      Auth: true
    }));
    //localStorage.setItem("Email", email);
  };

  const logout = () => {
    setUser((user) => ({
      Email: '',
      Auth: false
    }));
  };

  const roomContext = (Room, Subject) => {
    setRoom((room) => ({
      Room: Room,
      Subject: Subject
    }));
  };

  return (
    <UserContext.Provider value={{ user, room, loginContext, logout, roomContext }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContext, UserProvider};