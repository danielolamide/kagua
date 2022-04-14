import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@kagua/lib";
import AppLoading from "expo-app-loading";

const AuthContext = createContext();

function AuthProvider(props) {
	const [userSession, setUserSession] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setUserSession(supabase.auth.session() ?? null);
		setLoading(false);

		const { data: listener } = supabase.auth.onAuthStateChange(
			(__event, session) => {
				setUserSession(session ?? null);
				setLoading(false);
			}
		);

		return () => {
			listener?.unsubscribe();
		};
	}, []);

	if (loading) return <AppLoading />;

	const userData = {
		session: userSession,
		user: userSession?.user,
	};

	return <AuthContext.Provider value={userData} {...props} />;
}

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };

