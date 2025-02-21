import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// Initialize Auth Context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const auth = getAuth();

  const createUser = async (email, password) => {
    setIsLoading(true);
    setSignUpError(false);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!response.user) {
        throw new Error("something went wrong...");
      } else {
        const user = response.user;
        setUser(user);
        return response;
      }
    } catch (e) {
      setSignUpError(true);
    }
  };

  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!response.user) {
        throw new Error("something went wrong...");
      } else {
        const user = response.user;
        setUser(user);
        return response;
      }
    } catch (e) {
      setSignInError(true);
    }
  };

  const signOutUser = () => {
    setIsLoading(true);
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      }
    });
  }, []);

  const authValue = {
    createUser,
    loginUser,
    signOutUser,
    isLoading,
    user,
    signUpError,
    setSignUpError,
    signInError,
    setSignInError,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
