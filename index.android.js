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
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import config from './config'

const AnimatedIcon = Animated.createAnimatedComponent(IoniconsIcons)

const weatherIcons = [
  'weather-sunny', // 800 day
  'weather-night', // 800 night

  'weather-cloudy',   // 802,803,804
  'weather-fog',  // 741
  'weather-hail',  // 611,612,906
  'weather-lightning', // 210,211,212,221
  'weather-lightning-rainy', // 200,201,202
  'weather-partlycloudy', // 801
  'weather-pouring', // 500,511,520
  'weather-rainy', // 501,502,503,504,521,522,531
  'weather-snowy-rainy', // 615,616,620,621
  'weather-snowy', // 600,601,602
  // 'weather-sunset',
  // 'weather-sunset-down',
  // 'weather-sunset-up',
  'weather-windy',  // 905
  'weather-windy-variant' // 957
]

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
  },
  alignItems : {
    // flex : 1,
    alignItems : 'center'
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
    rotation : new Animated.Value(0), // rotate
    rotationLoop : 1,  // for rotation
    rotationFrom : '0deg', // for rotationLoop
    rotationTo : '360deg', // for rotationLoop
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
    const getCurrentWeatherIcon = () => {
      let icon = 0
      // TODO: refactor this later....  TOO UGLY!!! XD
      switch(this.state.ico){
        case 800:
          // check if it's day or night
          // return 0 or 1 respectively
          break
        case 802 :
        case 803 :
        case 804 :
          icon = 2
          break
        case 741:
          icon = 3
          break
        case 611 :
        case 612 :
        case 906 :
          icon = 4
          break
        case 210 :
        case 211 :
        case 212 :
        case 221 :
          icon = 5
          break
        case 200 :
        case 201 :
        case 202 :
          icon = 6
          break
        case 801 :
          icon = 7
          break
        case 500 :
        case 511 :
        case 520 :
          icon = 8
          break
        case 501 :
        case 502 :
        case 503 :
        case 521 :
        case 522 :
        case 531 :
          icon = 9
          break
        case 615 :
        case 616 :
        case 620 :
        case 621 :
          icon = 10
          break
        case 600 :
        case 601 :
        case 602 :
          icon = 11
          break
        case 905 :
          icon = 12
          break
        case 957 :
          icon = 13
          break
        default :
          break
      }

      return weatherIcons[icon]
    }

    const renderText = ( style, text ) => {
      return <Text style={ style }> { text }</Text>
    }

    const spin = this.state.rotation.interpolate({
      inputRange : [0,1],
      outputRange : [
        this.state.rotationFrom,
        this.state.rotationTo
      ]
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
        <View style={[ styles.titleView ]}>
          {
            renderText([ styles.text, styles.title ], 'The weather in your z')
          }
          <AnimatedIcon
            style={[
              styles.titleIcon,
              {
                transform : [
                { rotate : spin }
              ] }
            ]}
            name={ "ios-sunny-outline" }
            size={ 48 }
            color={ "#FF9700" }
          />
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
        <View style={[ styles.titleView, styles.alignItems ]}>
          <MaterialCommIcons
            // style={[ styles.icon ]}
            name={ getCurrentWeatherIcon() }
            size={ 40 }
            // color={ "#C70039" }
            color="#FFC300"
          />
          { renderText([ styles.text, styles.icon ], this.state.desc ) }
        </View>
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
        const ico = tempData.temp.weather[ 0 ].id
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
  }

  componentDidMount() {
    const animateRotation = () => {
      Animated.timing(
        this.state.rotation,
        {
          toValue : 1,
          duration : 5000,
          easing : Easing.linear
        }
      ).start(() => {
        let {
          rotationLoop,
          rotationFrom,
          rotationTo,
          rotation
        } = this.state

        rotationLoop = rotationLoop + 1
        rotationFrom = rotationTo
        rotationTo = `${ rotationLoop * 360 }deg`
        rotation = new Animated.Value(0)

        this.setState({
          rotationLoop,
          rotationFrom,
          rotationTo,
          rotation
        })

        animateRotation()
      })
    }

    animateRotation()
  }
}

AppRegistry.registerComponent('WeatherAppReactNative', () => weatherApp)
