import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const { onRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) validate();
  }, [username, email, password, hasSubmitted]);

  const validate = () => {
    let newErrors = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
  };

  const register = async () => {
    setHasSubmitted(true);

    if (Object.keys(errors).length === 0) {
      const result = await onRegister(username, email, password);
      if (result && result.error) {
        setErrors((prevErrors) => ({ ...prevErrors, status: result.txt }));
      } else {
        navigation.navigate("Login");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Text style={styles.error}>{errors.email}</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Text style={styles.error}>{errors.username}</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          selectTextOnFocus={true}
          autoCapitalize="none"
          autoComplete="off"
        />
        <Text style={styles.error}>
          {errors.password ? errors.password : errors.status ? errors.status : ""}
        </Text>
        <Button onPress={register} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
    width: "80%",
  },
  input: {
    height: 44,
    borderWidth: 0,
    padding: 10,
    borderBottomWidth: 2,
    fontSize: 14,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    top: "25%",
  },
  error: {
    color: "red",
    fontSize: 10,
    borderTopWidth: 2,
    borderColor: "red",
  },
});

export default Login;
