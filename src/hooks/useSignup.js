import { useContext, useEffect, useState } from "react";
import { auth } from "./../config";
import { AuthContext } from "../contexts/AuthContext";

export function useSignup() {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);
  // error, isPending, signup??
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);


      if (!res) {
        throw new Error("Could not complete signup");
      }

      await res.user?.updateProfile({ displayName });

      // dispatch and update the state
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCanceled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCanceled) {
        console.log(err.message);
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

  return { error, isPending, signup };
}
