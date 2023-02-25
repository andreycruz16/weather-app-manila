import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, RefreshControl} from 'react-native';

interface WeatherData {
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
  };
}

function App(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Manila,PH&appid=77e6bf9522b8e6a987ab31cff88d7a36',
    )
      .then(response => response.json())
      .then((data: WeatherData) => {
        setWeatherData(data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  if (refreshing) {
    console.log('hello');

    return (
      <View style={[styles.container, styles.center]}>
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Error loading weather data</Text>
      </View>
    );
  }

  const {name, weather, main} = weatherData;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.center, styles.scrollViewContent]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>City: {name}</Text>
      <Text>Weather: {weather[0].main}</Text>
      <Text>Description: {weather[0].description}</Text>
      <Text>Temperature: {Math.round(main.temp - 273.15)} °C</Text>
      <Text>Feels like: {Math.round(main.feels_like - 273.15)} °C</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default App;
