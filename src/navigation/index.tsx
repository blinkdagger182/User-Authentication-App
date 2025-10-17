import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

export type AuthStackParamList = {
	Login: undefined;
	Signup: undefined;
};

export type AppStackParamList = {
	Home: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Signup" component={SignupScreen} />
		</AuthStack.Navigator>
	);
}

function AppNavigatorInner() {
	return (
		<AppStack.Navigator>
			<AppStack.Screen name="Home" component={HomeScreen} />
		</AppStack.Navigator>
	);
}

export function AppNavigator() {
	const { user, loading } = useAuth();
	if (loading) {
		return null;
	}
	return user ? <AppNavigatorInner /> : <AuthNavigator />;
}


