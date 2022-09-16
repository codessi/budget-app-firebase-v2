import { useState, useContext, useEffect } from "react";
import { auth } from "../config";
import { AuthContext } from "../contexts/AuthContext";

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });

      if (!isCanceled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCanceled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return { error, isPending, logout };
};
