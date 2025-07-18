import { createContext, useState, type FC, type ReactNode } from "react";
import { useCookies } from "react-cookie";
import type { ContextType } from "../types/ContextType";

export const Context = createContext<ContextType>({
  token: "",
  setToken: () => null
});

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(cookie.token || null);

  setCookie("token", token);
  return (
    <Context.Provider value={{ setToken, token }}>
      {children}
    </Context.Provider>
  );
};