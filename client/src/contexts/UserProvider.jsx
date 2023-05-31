import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../services/auth.service";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const setAuthStatus = async () => {
		const response = await isAuthenticated();
		if (response.status === 200) {
			setIsLoggedIn(response.data.isAuthenticated);
			setUser(response.data.user);
		}
	};

	useEffect(() => {
		setAuthStatus();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, isLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};
