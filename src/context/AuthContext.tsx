import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
	name: string;
	email: string;
};

type AuthContextValue = {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
	error: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'auth.user.v1';
const CREDENTIALS_KEY = 'auth.credentials.v1';

function isValidEmail(email: string): boolean {
	return /\S+@\S+\.\S+/.test(email);
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const raw = await AsyncStorage.getItem(STORAGE_KEY);
				if (raw) {
					setUser(JSON.parse(raw));
				}
			} catch {}
			setLoading(false);
		})();
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		setError(null);
		if (!isValidEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if (!password) {
			setError('Password is required.');
			return;
		}
		// Validate against stored credentials if exist
		const rawCreds = await AsyncStorage.getItem(CREDENTIALS_KEY);
		if (rawCreds) {
			const creds = JSON.parse(rawCreds) as { email: string; password: string; name: string };
			if (creds.email !== email || creds.password !== password) {
				setError('Incorrect credentials.');
				throw new Error('Incorrect credentials');
			}
			const existingUser: User = { name: creds.name, email: creds.email };
			setUser(existingUser);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingUser));
			return;
		}
		// If no stored credentials, allow login with password length >= 6 (demo)
		if (password.length < 6) {
			setError('Password must be at least 6 characters.');
			return;
		}
		const mockUser: User = { name: email.split('@')[0], email };
		setUser(mockUser);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
	}, []);

	const signup = useCallback(async (name: string, email: string, password: string) => {
		setError(null);
		if (!name || !email || !password) {
			setError('All fields are required.');
			return;
		}
		if (!isValidEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if (password.length < 6) {
			setError('Password must be at least 6 characters.');
			return;
		}
		const newUser: User = { name, email };
		setUser(newUser);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
		await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ name, email, password }));
	}, []);

	const logout = useCallback(async () => {
		setUser(null);
		await AsyncStorage.removeItem(STORAGE_KEY);
	}, []);

	const value = useMemo(
		() => ({ user, login, signup, logout, loading, error }),
		[user, login, signup, logout, loading, error]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return ctx;
}


