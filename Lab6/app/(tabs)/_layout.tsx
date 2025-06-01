import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: '#007BFF' },
      headerTintColor: '#fff',
      tabBarActiveTintColor: '#007BFF'
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
    </Tabs>
  );
}
