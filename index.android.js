import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
// import Icon from 'react-native-vector-icons/FontAwesome'
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
    fontFamily : 'Quicksand',
  //   // fontWeight : 'bold',
    // fontStyle : 'italic',
    color : '#eee',
  //   textAlign : 'center'
  },
  title : {
    fontSize : 26,
    //
  },
  titleIcon: {
    marginLeft : -6,
    marginTop : -3,
    marginRight : -13
  },
  titleView : {
    flexDirection : 'row'
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
    location : 'location unknown',
    temp : 0,
    tempC : 0,
    tempF : 0,
    max : '',
    maxC : '',
    maxF : '',
    min : '',
    minC : '',
    minF : '',
    tempUnit : 'K',
    watchID : 0,
    tries : 1,
    ico : '',
    desc : '',
    textOpacity : new Animated.Value(1), // opacity
    rotation : new Animated.Value(0) // rotate
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
            duration : 50,
            easing : Easing.out(Easing.ease),
        }),
        Animated.timing(
          textOpacity,
          {
            toValue : 1,
            duration : 50,
            easing : Easing.in(Easing.ease)
        })
    ]).start(() => {
      textOpacity.removeAllListeners()
    })
  }

  render() {
    const renderText = ( style, text ) => {
      return <Text style={ style }> { text }</Text>
    }

    const spin = this.state.rotation.interpolate({
      inputRange : [0,1],
      outputRange : ['0deg', '360deg']
      // inputRange : [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ],
      // outputRange : [
      //   '0deg',
      //   '36deg',
      //   '72deg',
      //   '108deg',
      //   '144deg',
      //   '180deg',
      //   '216deg',
      //   '252deg',
      //   '288deg',
      //   '324deg',
      //   '360deg'
      // ]
    })

    return (
      <LinearGradient
        style={styles.main}
        colors={[
          '#F2E9E4',
          '#C9ADA7',
          '#9A8C98'
        ]}
        locations={[
          0,0.6,0.9
        ]}
        >
        {/* <View style={styles.main}> */}
        <View style={[ styles.titleView ]}>
          {
            renderText([ styles.text, styles.title ], 'The weather in your z')
          }
          {/* <View
            style={{
              transform : [{
                rotate : this.state.rotation.interpolate({
                  inputRange : [ 0, 1 ],
                  outputRange : [ '0deg', '360deg' ]
                })
              }]
            }}
          > */}
            {/* <View
              style={{
                height : 100,
                width : 100,
                backgroundColor : 'red',
                transform : [{
                  rotateX : '180deg'
                },{
                  rotate : '120deg'
                }]
              }}
            /> */}
            <Icon
              style={[
                styles.titleIcon,
                { transform : [
                  // { scale : 1 },
                  { rotate : spin }
                ] }
              ]}
              name="ios-sunny-outline"
              size={ 48 }
              color="yellow"
            />
          {/* </View> */}
          {
            renderText([ styles.text, styles.title ], 'ne')
          }
        </View>
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

  componentDidMount() {
    const animateRotation = () => {
      Animated.timing(
        this.state.rotation,
        {
          // toValue : this.state.rotation === '360deg' ? '0deg' : '360deg',
          toValue : 1,
          duration : 1000,
          easing : Easing.linear(Easing.ease)
        }
      ).start(() => animateRotation())
    }

    animateRotation()
  }
}

AppRegistry.registerComponent('WeatherAppReactNative', () => weatherApp)
