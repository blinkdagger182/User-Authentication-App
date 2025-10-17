import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
	const { user, logout } = useAuth();
	return (
		<View style={{ flex: 1, padding: 24, gap: 16, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ fontSize: 24, fontWeight: '700' }}>Welcome</Text>
			<Text style={{ fontSize: 18 }}>{user?.name}</Text>
			<Text style={{ color: '#555' }}>{user?.email}</Text>
			<TouchableOpacity
				onPress={logout}
				style={{ marginTop: 20, backgroundColor: '#ef4444', padding: 14, borderRadius: 8 }}
			>
				<Text style={{ color: 'white', fontWeight: '600' }}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}


