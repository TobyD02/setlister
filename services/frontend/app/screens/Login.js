import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {

  const navigation = useNavigation()

  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const result = await onLogin(username, password);
    if (result && result.error) {
      alert(`status: ${result.status}, txt: ${result.txt}`);
    }
  };
  const register = async () => {
    navigation.navigate('Register')
  };

  const validate = () => {
    let errors = {}

    if (!email) {
      errors.email = "Email is required"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username/Email"
          onChangeText={(text) => setUsername(text)}
          value={username}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          autoComplete="off"
        />
        <Button onPress={login} title="Login" />
        <Button onPress={register} title="Register" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 0,
    borderRadius: 32,
    padding: 10,
    backgroundColor: "#ddd",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    top: "25%",
    // height: "100%",
  },
});

export default Login;
