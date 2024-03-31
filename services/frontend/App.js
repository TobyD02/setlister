import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the function to make the Axios GET request
    const fetchData = async () => {
      try {
        // Make the GET request to the API URL
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL);
        // Extract the data from the response
        const apiData = response.data;
        // Update the state with the fetched data
        setData(apiData);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup actions if necessary
    };
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <View style={styles.container}>
      {/* Render the fetched data */}
      {data ? (
        <Text>Data from API: {JSON.stringify(data)}</Text>
      ) : (
        <Text>Loading... {process.env.EXPO_PUBLIC_API_URL}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
