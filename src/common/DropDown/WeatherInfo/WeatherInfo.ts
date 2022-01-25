 /*import React, { Component } from 'react';

  export default class Weather extends Component {
    state = {
      temp: "",
      pressure: "",
      temp_min: "",
      temp_max: ""
    }
    componentDidMount() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=98e5bfeb477c9bec9f5ee8de192eaed8`)
        .then(function (response) {
          return response.json();
        })
        .then(
        (result) => {
          let { temp, pressure, temp_min, temp_max } = result.main
          this.setState({
            temp,
            pressure,
            temp_min,
            temp_max
          });
        })
        .catch(function (error) {
          console.log('Request failed', error)
        });
    }
    render() {
      return  (
      {
        <ul>
        <li>temp: {this.state.temp} </li>
        <li>pressure: {this.state.pressure} </li>
        <li>temp_min: {this.state.temp_min} </li>
        <li>temp_max: {this.state.temp_max} </li>
      </ul>})
    }
  }
  

  /*сделать юсэфект для обработки апи и запихнуть результат в юсстейт
  возможно сделать собственный хук
  возможно сделать объект - виджет*/

import React, { useCallback, useEffect, useState } from 'react';


interface GettingWeatherProps {
    buttonRef: React.RefObject<HTMLElement|null>,
    city: string,
    addWeatherFunction: Function
}

const useGettingWeather = ({
    buttonRef,
    city,
    addWeatherFunction
}: GettingWeatherProps) => {
    const temp = '';
    const [weather, setWeather] = useState(temp);

    const onMouseDown = useCallback(() => {
      try {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=98e5bfeb477c9bec9f5ee8de192eaed8')
          .then(res => res.json())
          .then(weather => {
            setWeather(weather.main.temp);
          });
      } catch (e) {}
      console.log('Temperature in ' + city + ': ' + weather)
      addWeatherFunction('text')
    }, [city, weather, setWeather])

    useEffect(() => {  
        if (buttonRef.current) {
            buttonRef.current.addEventListener('mousedown', onMouseDown)
        }
        return () => {
          if (buttonRef.current) {
            buttonRef.current.removeEventListener('mousedown', onMouseDown)  
          }
        }
    }, [buttonRef.current, onMouseDown, city])
};
export { useGettingWeather };