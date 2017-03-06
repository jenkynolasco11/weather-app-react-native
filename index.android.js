import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
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
    // message : 'Hi, how are you doing?',
    // // initialPosition : 'unknown',
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
    desc : ''
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
      minF
    } = this.state
    const isCelcius = tempUnit === 'C'

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

  render() {
    const renderText = ( style, text ) => {
      // console.warn(text)
      return (
          <Text style={style}>
          {
            text
          }
          </Text>
      )
    }

    return (

        <View style={styles.main}>
          { renderText([ styles.text, styles.title ], 'The weather in your zone') }
          { renderText([ styles.text, styles.city ], this.state.location ) }
          <TouchableHighlight onPress={ this.switchTemp.bind(this) }>
            { renderText([ styles.text, styles.temp ], `${ this.state.temp } °${ this.state.tempUnit }` ) }
          </TouchableHighlight>
          { renderText([ styles.text, styles.icon ], this.state.desc ) }
          {/* <Text style={styles.text}> The weather in your zone</Text>
          <Text {
              `Current Position: ${ this.state.location }\n`
            }
            {
              `Current Temperature: ${ this.state.temp }\n`
            }
            {
              `Watch ID: ${ this.state.watchID }`
            }
          </Text> */}
        </View>

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
        const data = await fetch(request)
        const tempData = await data.json()

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

          // console.warn(min,max,temp)

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
      // fetch(request).then( data => data.json()).then( tempData => {
      // // const tempData = await data.json()
      // // try{
      //   console.warn('got data')
      //   console.warn(JSON.stringify(tempData.temp))
      //   const tempK = tempData.temp.temp.curr
      //   const tempMinK = tempData.temp.temp.min
      //   const tempMaxK = tempData.temp.temp.max
      //   const area = tempData.temp.name
      //
      //   const ico = tempData.temp.weather[ 0 ].icon
      //   const desc = tempData.temp.weather[ 0 ].main
      //
      //   this.setState( state => {
      //     let {
      //       temp,
      //       min,
      //       max,
      //       tempC,
      //       minC,
      //       maxC,
      //       tempF,
      //       minF,
      //       maxF,
      //       tempUnit
      //     } = state
      //
      //     const setTempToC = (t) => {
      //       return Math.round(t - 273.15)
      //     }
      //
      //     const setTempToF = (t) => {
      //       return Math.round(( t * (9/5) ) + 32)
      //     }
      //
      //     minC = setTempToC(tempMinK)
      //     minF = setTempToF(minC)
      //     maxC = setTempToC(tempMaxK)
      //     maxF = setTempToF(maxC)
      //     tempC = setTempToC(tempK)
      //     tempF = setTempToF(tempC)
      //
      //     temp = tempF
      //     tempUnit = 'F'
      //     min = minF
      //     max = maxF
      //
      //     // console.warn(min,max,temp)
      //
      //     return {
      //       min,
      //       minC,
      //       minF,
      //       max,
      //       maxC,
      //       maxF,
      //       temp,
      //       tempC,
      //       tempF,
      //       tempUnit,
      //       tries : 1,
      //       location : area,
      //       ico,
      //       desc
      //     }
      //   })
      // }).catch(err => console.error(`something happened: ${ err }`))
    }

    // navigator.geolocation.getCurrentPosition(
    //   fetchTemp,
    //   err => {
    //     alert(JSON.stringify(err))
    //   }, {
    //     enableHighAccuracy : true,
    //     timeout : 20000,
    //     maximumAge : 10000
    //   })

    const watchID = navigator.geolocation.watchPosition(
      fetchTemp,
      error => {
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
