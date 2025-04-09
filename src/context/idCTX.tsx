import { createContext } from "react";

export interface IdContextType {
    params: { id: string };
    setBg: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const idCTX = createContext<IdContextType | null>(null);
