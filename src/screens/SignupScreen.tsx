import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
	const { signup, error } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSignup = async () => {
		await signup(name.trim(), email.trim(), password);
	};

	return (
		<View style={{ flex: 1, padding: 24, gap: 12, justifyContent: 'center' }}>
			<Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 12 }}>Signup</Text>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={setName}
				style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
			/>
			<TextInput
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
				style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
			/>
			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
			/>
			{error ? <Text style={{ color: 'crimson' }}>{error}</Text> : null}
			<TouchableOpacity
				onPress={onSignup}
				style={{ backgroundColor: '#16a34a', padding: 14, borderRadius: 8, alignItems: 'center' }}
			>
				<Text style={{ color: 'white', fontWeight: '600' }}>Signup</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text style={{ color: '#4f46e5', textAlign: 'center' }}>Go to Login</Text>
			</TouchableOpacity>
		</View>
	);
}


