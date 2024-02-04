import { createContext, useEffect, useState, useContext } from "react";
import { getUserId } from "./service/authService";

type AuthProviderProp = {
  children: React.ReactNode;
};

type AuthContextType = {
  userId: string;
};

export const AuthContext = createContext<AuthContextType>({userId: ""});

AuthContext.displayName = "AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

const AuthProvider = ({ children }: AuthProviderProp) => {
  const [userId, setUserId] = useState<string>("");

  const retrieveUserId = () => {
    const userId = getUserId();
    setUserId(userId);
  };

  useEffect(() => {
    retrieveUserId();
  }, []);

  const value = {
    userId,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
