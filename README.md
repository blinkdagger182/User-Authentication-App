# Auth Context App

A React Native (Expo) app demonstrating authentication using React Context API with Login, Signup, and Home screens. Navigation is handled by React Navigation. Authentication state is persisted with AsyncStorage.

## Features
- Context-based auth (`login`, `signup`, `logout`, `user` state)
- Login and Signup forms with validation and error messages
- Home screen showing user name and email
- Persisted auth session (AsyncStorage)
- Navigation between Login, Signup, and Home
- Password visibility toggle on Login

## Tech Stack
- Expo SDK 51, React Native 0.74, React 18
- React Navigation (native stack)
- AsyncStorage
- TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm i -g expo`

### Install
```bash
npm install
```

### Run (choose one)
```bash
npm run start
npm run ios
npm run android
```

## Project Structure
```
src/
  context/AuthContext.tsx
  navigation/index.tsx
  screens/
    LoginScreen.tsx
    SignupScreen.tsx
    HomeScreen.tsx
  types/navigation.d.ts
App.tsx
```

## Notes
- This project uses a mock auth flow for demo purposes. Any email with a password of at least 6 characters will log in if no stored account exists. After signing up, login validates against the stored credentials.
- To reset session, use the Logout button or clear app storage.

## Screenshots
- Add screenshots in `docs/` or include a short demo video.

## License
MIT
# User-Authentication-App
# User-Authentication-App
