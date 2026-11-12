import type { LoginData, LoginResponse } from "../types/auth.types";
import { createContext } from "react";

interface AuthContextData {
    user: LoginResponse['user'] | null;
    token: string | null;
    isAuthenticated: boolean;
    signIn: (data:LoginData) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);