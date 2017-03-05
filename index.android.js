import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet
} from 'react-native'
import config from './config'

const styles = StyleSheet.create({
  main : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'steelblue'
  },
  text : {
    fontSize : 20,
    fontFamily : 'Poiret',
    fontWeight : 'bold',
    color : '#eee',
    textAlign : 'center'
  }
})

export default class weatherApp extends Component{
  state = {
    message : 'Hi, how are you doing?',
    // initialPosition : 'unknown',
    location : 'unknown',
    temp : '',
    watchID : 0,
    tries : 1
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>
          {
            `Current Position: ${ this.state.location }\n`
          }
          {
            `Current Temperature: ${ this.state.temp }\n`
          }
          {
            `Watch ID: ${ this.state.watchID }`
          }
        </Text>
      </View>
    )
  }

  componentDidMount() {
    // navigator.geolocation.getCurrentgetCurrentPosition(
    //   (position) => {
    //     const initialPosition = JSON.stringify(position)
    //     this.setState({ initialPosition })
    //   }, (err) => {
    //     alert(JSON.stringify(err))
    //   }, {
    //     enableHighAccuracy : true,
    //     timeout : 20000,
    //     maximumAge : 10000
    //   })
    const fetchTemp = async (position) => {
      const tries = 1
      const location = {
        lon : position.coords.longitude,
        lat : position.coords.latitude
      }
      const request = `https://rn-weather-app.herokuapp.com/${ config.KEY }/${ location.lon }/${ location.lat }`

      try{
        const data = await fetch(request)
        const temp = JSON.stringify(await data.json())
        this.setState({
          temp,
          tries,
          location : JSON.stringify(location)
        })

      } catch(err) {
        alert(`something happened, error: ${ err }`)
      }
    }

    const watchID = navigator.geolocation.watchPosition(
      fetchTemp
      /*pos => {
        const position = JSON.stringify({
          longitude : pos.coords.longitude,
          latitude : pos.coords.latitude
        })

        this.setState({ position })
      }*/, error => {
        alert(JSON.stringify(error))
      }, {
        enableHighAccuracy : true,
        timeout : 20000,
        maximumAge : 1000
      })

      this.setState({ watchID })
  }
}

AppRegistry.registerComponent('WeatherAppReactNative', () => weatherApp)
