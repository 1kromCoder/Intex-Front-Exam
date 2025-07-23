import type { Dispatch, SetStateAction } from "react";

export interface ContextType {
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>,
    toolsUz: any[],
    toolsRU: any[],
    setToolsUz: Dispatch<SetStateAction<any[]>>,
    setToolsRu: Dispatch<SetStateAction<any[]>>
}