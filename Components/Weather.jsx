import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image} from 'react-native';
import axios from 'axios';




const  Weather = () => {

const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [layout, setLayout] = useState('');
const [temp, setTemp] = useState(0);
const [humidity, setHumidity] = useState(0);
const [widSpeed, setWindSpeed] = useState(0);
const [windDegree, setWindDegree] = useState(0);
const apiKey = "b2307c78a2534a93cbd29390deba0618";  


  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (position) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
    .then((result) => {
      console.log(result.data)
      setName(result.data.name);
      setIcon(result.data.weather[0].icon);
      setLayout(result.data.weather[0].description);
      setTemp(result.data.main.temp);
      setHumidity(result.data.main.humidity);
      setWindSpeed(result.data.wind.speed);
      setWindDegree(result.data.wind.deg)
    })}, console.log("err") );
  }) 

  return (
    <>
      <Text h1>{name}</Text>
      <Image source={{uri:`https://openweathermap.org/img/wn/${icon}@2x.png`}} style={{width: 100, height: 100}}/>
      <Text>{temp}°C</Text>
      <Text>Humidity : {humidity}%</Text>

        <Text>Wind speed : {Math.round(widSpeed*3.6)} km/h </Text>
        <Image 
          source={require('../assets/arrow.png')}
          style={ {transform:[{rotateZ: `${windDegree}deg`}], width: 50, height: 50}}
        />

    </>
  )
}

export default Weather;