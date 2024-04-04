import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';
const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({token: null, authenticated: null})

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY) 
      // alert(`token: ${token}`)

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setAuthState({token, authenticated: true})
      }
    }

    loadToken()
  }, [])

  const register = async (username, email, password) => {
    
    try {
      const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users`, {email: email, password: password, username: username})
    } catch (e) {
      alert(`keys: ${Object.keys(e)}, values: ${Object.values(e)}`)
      return {error: e, txt: e.response.data.error, status: e.response.status}
    }
  }

  const login = async (username, password) => {
    try {
      const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth`, {username, password})
      // alert('Auth result: ', result)

      setAuthState({token: result.data.token, authenticated: true})

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)

      return result

    } catch (e) {
      return {error: e, txt: e.response.data.error, status: e.response.status}
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({token: null, authenticated: false});
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

