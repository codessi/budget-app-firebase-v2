import  { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside in AuthContextProvider");
  }

  return context;
}
