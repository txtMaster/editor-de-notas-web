import React, { useCallback, useEffect, useMemo, useRef, useState} from "react";
import { AuthContext, type Profile } from "../../context/AuthContext";

const PROFILE_STORAGE_KEY: string = "app_profile";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const fetchingRef = useRef(false);
	const [profile, setProfile] = useState<Profile>(() => {
		const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
		return saved ? JSON.parse(saved) : null;
	});
	const isAuthenticated = useMemo(() => profile !== null, [profile]);

	const logout:()=>Promise<string> = useCallback(async():Promise<string>=>{
		if(fetchingRef.current)  throw new Error("en cola, reintentar mas tarde");
		fetchingRef.current = true;
		try {
			setProfile(null);
			return "guardado";
		} catch (err) {
			console.log(err)
			return "ocurrio un error";
		} finally {
			fetchingRef.current = false;
		}
	},[]);

	const login = useCallback(async (): Promise<string>=>{
		if (fetchingRef.current) throw new Error("en cola, reintentar mas tarde")
			fetchingRef.current = true;
		try{
			await new Promise((res)=>setTimeout(res,500));
			setProfile({name:"test user",email:"example@test.com"})
			return "guardado correctamente";
		}finally{
			fetchingRef.current = false;
		}
	},[]);

	useEffect(() => {
		if (profile === null) localStorage.removeItem(PROFILE_STORAGE_KEY);
		else localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
	}, [profile]);
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				fetching: fetchingRef.current,
				profile,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
