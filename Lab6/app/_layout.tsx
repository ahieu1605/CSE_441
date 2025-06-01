import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: '#2D9CDB' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
      }} />
    </SafeAreaProvider>
  );
}
