import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

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
  const isDarkMode = useColorScheme() === 'dark';

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Manila,PH&appid=77e6bf9522b8e6a987ab31cff88d7a36',
    )
      .then(response => response.json())
      .then((data: WeatherData) => setWeatherData(data))
      .catch(error => console.log(error));
  }, []);

  if (!weatherData) {
    return (
      <View>
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  const {name, weather, main} = weatherData;

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.center}>
        <Text>City: {name}</Text>
        <Text>Weather: {weather[0].main}</Text>
        <Text>Description: {weather[0].description}</Text>
        <Text>Temperature: {Math.round(main.temp - 273.15)} °C</Text>
        <Text>Feels like: {Math.round(main.feels_like - 273.15)} °C</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
