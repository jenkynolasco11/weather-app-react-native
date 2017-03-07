import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  // Icon,
  // LinearGradient
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import config from './config'

const styles = StyleSheet.create({
  main : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    // backgroundColor : 'steelblue'
  },
  text : {
  //   fontSize : 30,
    fontFamily : 'Poiret One',
  //   // fontWeight : 'bold',
  //   // fontStyle : 'italic',
    color : '#eee',
  //   textAlign : 'center'
  },
  title : {
    fontSize : 24,
    //
  },
  city : {
    fontSize : 16,
    //
  },
  temp : {
    fontSize : 45,
    //
  },
  icon : {
    fontSize : 24
  }
})

export default class weatherApp extends Component{
  state = {
    location : 'unknown',
    temp : '',
    tempC : '',
    tempF : '',
    max : '',
    maxC : '',
    maxF : '',
    min : '',
    minC : '',
    minF : '',
    tempUnit : '',
    watchID : 0,
    tries : 1,
    ico : '',
    desc : '',
    textOpacity : new Animated.Value(1) // opacity
  }

  constructor(props) {
    super(props)
  }

  switchTemp() {
    let {
      temp,
      tempC,
      tempF,
      tempUnit,
      max,
      maxC,
      maxF,
      min,
      minC,
      minF,
      textOpacity
    } = this.state
    const isCelcius = tempUnit === 'C'
    const delay = 200

    textOpacity.addListener( ({ value }) => {
      if(!value){
        temp = isCelcius ? tempF : tempC
        tempUnit = isCelcius ? 'F' : 'C'
        max = isCelcius ? maxF : maxC
        min = isCelcius ? minF : minC

        this.setState({
          temp,
          tempUnit,
          max,
          min
        })
      }
    })

    Animated.sequence([
        Animated.timing(
          textOpacity,
          {
            toValue : 0,
            duration : 100,
            easing : Easing.out(Easing.ease),
        }),
        Animated.timing(
          textOpacity,
          {
            toValue : 1,
            duration : 100,
            easing : Easing.out(Easing.ease)
        })
    ]).start(() => {
      textOpacity.removeAllListeners()
    })
  }

  render() {
    const renderText = ( style, text ) => {
      return <Text style={ style }> { text }</Text>
    }

    return (
      <LinearGradient
        style={styles.main}
        colors={[
          'steelblue',
          'red',
          'yellow'
        ]}
        locations={[
          0,0.6,0.8
        ]}
        >
        {/* <View style={styles.main}> */}
        { renderText([ styles.text, styles.title ], 'The weather in your zone') }
        { renderText([ styles.text, styles.city ], this.state.location ) }
        <TouchableWithoutFeedback onPress={ this.switchTemp.bind(this) }>
          <Animated.View
            style={{
              opacity : this.state.textOpacity
              //
            }}
            >
          { renderText([ styles.text, styles.temp ], `${ this.state.temp } °${ this.state.tempUnit }` ) }
        </Animated.View>
        </TouchableWithoutFeedback>
        { renderText([ styles.text, styles.icon ], this.state.desc ) }
        {/* // </View> */}
      </LinearGradient>
    )
  }

  componentWillMount() {
    const fetchTemp = async (position) => {
      const tries = 1
      const location = {
        lon : position.coords.longitude,
        lat : position.coords.latitude
      }
      const request = `https://rn-weather-app.herokuapp.com/${ config.KEY }/${ location.lon }/${ location.lat }`

      try{
        const response = await fetch(request)
        const tempData = await response.json()

        const tempK = tempData.temp.temp.curr
        const tempMinK = tempData.temp.temp.min
        const tempMaxK = tempData.temp.temp.max
        const area = tempData.temp.name
        const ico = tempData.temp.weather[ 0 ].icon
        const desc = tempData.temp.weather[ 0 ].main

        this.setState( state => {
          let {
            temp,
            min,
            max,
            tempC,
            minC,
            maxC,
            tempF,
            minF,
            maxF,
            tempUnit
          } = state

          const setTempToC = (t) => {
            return Math.round(t - 273.15)
          }

          const setTempToF = (t) => {
            return Math.round(( t * (9/5) ) + 32)
          }

          minC = setTempToC(tempMinK)
          minF = setTempToF(minC)
          maxC = setTempToC(tempMaxK)
          maxF = setTempToF(maxC)
          tempC = setTempToC(tempK)
          tempF = setTempToF(tempC)

          temp = tempF
          tempUnit = 'F'
          min = minF
          max = maxF

          return {
            min,
            minC,
            minF,
            max,
            maxC,
            maxF,
            temp,
            tempC,
            tempF,
            tempUnit,
            tries : 1,
            location : area,
            ico,
            desc
          }
        })
      } catch(err) {
        alert(`something happened, error: ${ err }`)
      }
    }

    const watchID = navigator.geolocation.watchPosition(
      fetchTemp,
      error => {
        alert(`something happened, error: ${ JSON.stringify(error) }`)
      }, {
        enableHighAccuracy : true,
        timeout : 20000,
        maximumAge : 1000
      })

      this.setState({ watchID })

      // setTimeout(() => {
      //   navigator.geolocation.getCurrentPosition(
      //     fetchTemp,
      //     err => {
      //       alert(JSON.stringify(err))
      //     }, {
      //       enableHighAccuracy : true,
      //       timeout : 20000,
      //       maximumAge : 10000
      //     }
      //   )
      // }, 1000)
  }
}

AppRegistry.registerComponent('WeatherAppReactNative', () => weatherApp)
