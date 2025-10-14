import { useCallback, useEffect, useMemo, useState, type JSX } from "react";
import { AuthContext, type Profile } from "../../context/AuthContext";

const PROFILE_STORAGE_KEY: string = "app_profile";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [profile, setProfile] = useState<Profile>(() => {
		const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
		return saved ? JSON.parse(saved) : null;
	});
	const isAuthenticated = useMemo(() => profile !== null, [profile]);

	/*
	const logout: ()=>Promise<string> = useCallback(async () => {
		if (fetching) throw new Error("en cola, reintentar mas tarde");
		setFetching(true);
		try {
			await new Promise((res)=>setTimeout(res,500));
			setProfile(null);
			return "guardado correctamente"
		} finally {
			setFetching(false);
		}
	}, [fetching]);
	*/

	const logout:()=>Promise<string> = useCallback(()=>new Promise<string>((res,rej)=>{
		if(fetching)return rej("en cola, reintentar mas tarde");
		setFetching(true);
		setTimeout(()=>{
			try{
				setProfile(null);
				res("guardado");
			}catch(err){
				rej(err);
			}finally{
				setFetching(false);
			}
		},500);
	}),[fetching]);

	const login: () => Promise<string> = useCallback(async () => {
		if (fetching) throw new Error("en cola, reintentar más tarde");
		setFetching(true);

		try {
			await new Promise((res) => setTimeout(res, 500));
			setProfile({ name: "test user", email: "ejemplo@" });
			return "guardado correctamente";
		} finally {
			setFetching(false);
		}
	}, [fetching]);

	useEffect(() => {
		if (profile === null) localStorage.removeItem(PROFILE_STORAGE_KEY);
		localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
	}, [profile]);
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				fetching,
				profile,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
