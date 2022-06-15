import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import  Forecasts from './Forecasts';

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4798dbe026be9121dbd3ffd96541ca32&lang=fr&units=metric`


export default function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
if (status !== "granted") {
  return
}

const userLocation = await Location.getCurrentPositionAsync()
getWeather(userLocation)
    }

    getCoordinates()
  }, [])

const getWeather = async (location) => {
  try {
    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

    setData(response.data)
setLoading(false)
  } catch(e) {
    console.log("Erreur dans getWeather")
  }
}

if (loading) {
  return  <View style={styles.container}>
      <ActivityIndicator/>
    </View>
}



  return (
    <View style={styles.container}>
      <CurrentWeather data={data}/>
      <Forecasts data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E6E1',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: "center"
  },
});
