import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
	const { login, error } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [localError, setLocalError] = useState<string | null>(null);

	const onLogin = async () => {
		setLocalError(null);
		try {
			await login(email.trim(), password);
		} catch (e) {
			setLocalError('Incorrect credentials.');
		}
	};

	return (
		<View style={{ flex: 1, padding: 24, gap: 12, justifyContent: 'center' }}>
			<Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 12 }}>Login</Text>
			<TextInput
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
				style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
			/>
			<View style={{ position: 'relative' }}>
				<TextInput
					placeholder="Password"
					secureTextEntry={!passwordVisible}
					value={password}
					onChangeText={setPassword}
					style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, paddingRight: 44 }}
				/>
				<TouchableOpacity
					style={{ position: 'absolute', right: 12, top: 12 }}
					onPress={() => setPasswordVisible((v) => !v)}
				>
					<Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={22} color="#666" />
				</TouchableOpacity>
			</View>
			{(error || localError) ? (
				<Text style={{ color: 'crimson' }}>{localError ?? error}</Text>
			) : null}
			<TouchableOpacity
				onPress={onLogin}
				style={{ backgroundColor: '#4f46e5', padding: 14, borderRadius: 8, alignItems: 'center' }}
			>
				<Text style={{ color: 'white', fontWeight: '600' }}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
				<Text style={{ color: '#4f46e5', textAlign: 'center' }}>Go to Signup</Text>
			</TouchableOpacity>
		</View>
	);
}


