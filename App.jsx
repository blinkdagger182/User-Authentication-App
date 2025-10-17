import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

function Root() {
	// Ensures context is available for navigators
	useAuth();
	return (
		<NavigationContainer>
			<AppNavigator />
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts(Ionicons.font);
	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}
	return (
		<AuthProvider>
			<Root />
		</AuthProvider>
	);
}


