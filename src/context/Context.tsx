import { createContext, useState, type FC, type ReactNode } from "react";
import { useCookies } from "react-cookie";
import type { ContextType } from "../types/ContextType";

export const Context = createContext<ContextType>({
  token: "",
  setToken: () => null,
  toolsUz: [],
  toolsRU: [],
  setToolsUz: () => null,
  setToolsRu: () => null
});

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(cookie.token || null);
  const [toolsUz, setToolsUz] = useState<any[]>([]);
  const [toolsRU, setToolsRu] = useState<any[]>([]);

  setCookie("token", token);
  return (
    <Context.Provider value={{ setToken, token, toolsUz, toolsRU, setToolsUz, setToolsRu }}>
      {children}
    </Context.Provider>
  );
};