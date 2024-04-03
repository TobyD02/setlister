import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext"; // Added import of useAuth
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";

const Stack = createNativeStackNavigator();

export default function App() { // Changed to use function declaration

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState.authenticated ? (
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerRight: () => (
                <Button onPress={onLogout} title="Logout" />
              ),
            }}
          />
        ) : (
          <Stack.Screen name='Login' component={Login} />
        )}
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
