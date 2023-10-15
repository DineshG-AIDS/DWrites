// import Cookie from "js-cookie";
// import { createContext, useEffect, useState } from "react";

// export const UserContext = createContext({});

// function UserContextProvider({ children }) {
//   const [IsLogedIn, SetIsLogedIn] = useState(false);

//   useEffect(() => {
//     const token = Cookie.get("token");
//     if (token) SetIsLogedIn(true);
//   }, []);

//   return (
//     <UserContext.Provider value={IsLogedIn}>{children}</UserContext.Provider>
//   );
// }

// export default UserContextProvider;

