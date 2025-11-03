import {
	createContext,
} from "react";

export type Profile = null | {
	name:string
	email:string
}
export type LoginData = null | {
	email:string
	password:string
}

type AuthContextType = {
	isAuthenticated: boolean;
	profile: Profile | null;
	login: (data: LoginData)=>Promise<string>;
	logout: ()=>Promise<string>;
	fetching: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);