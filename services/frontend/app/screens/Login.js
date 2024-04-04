import {
  View,
  Keyboard,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Define errors state
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) validate();
  }, [username, password, hasSubmitted]);

  const validate = () => {
    let newErrors = {};

    if (!username) newErrors.username = "Email or Username is required";
    if (!password) newErrors.password = "Password is required";

    if (errors.status) newErrors.status = errors.status;
    setErrors(newErrors);
  };

  const login = async () => {
    setHasSubmitted(true)
    if (Object.keys(errors).length === 0) {
      const result = await onLogin(username, password);
      if (result && result.error) {
        if (result.status !== 400) {
          setErrors((prevErrors) => ({ ...prevErrors, status: result.txt }));
        }
        // alert(result.status);
      }
    }
  };

  const register = async () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            {
              borderBottomColor:
                errors.username || errors.status ? "red" : "black",
            },
          ]}
          placeholder="Username/Email"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Text style={styles.error}>{errors.username}</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderBottomColor:
                errors.password || errors.status ? "red" : "black",
            },
          ]}
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
        <Button onPress={login} title="Login" />
        <Button onPress={register} title="Register" />
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
