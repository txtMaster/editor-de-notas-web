import {
	createContext,
} from "react";

export type Profile = null | {
	name:string
	email:string
}

type AuthContextType = {
	isAuthenticated: boolean;
	profile: Profile | null;
	login: ()=>Promise<string>;
	logout: ()=>Promise<string>;
	fetching: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);