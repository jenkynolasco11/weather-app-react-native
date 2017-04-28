import React from 'react'

import WeatherInterface from './WeatherInterface'
import Styles from './styles'

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

const WeatherApp = props => <WeatherInterface
                            styles={ Styles }
                            KEY={ props.KEY }
                            weatherIcons={ weatherIcons }
                        />

// import WeatherApp from '/Users/jenky/Dev/weatherApp/weather-app-react-native/app/components/WeatherInterface/TestComponent.jsx'

// import { View, Text } from 'react-native'
// export default () => {
//   return (
//     <View>
//       <Text>
//       {
//         " This is just a text "
//       }
//       </Text>
//     </View>
//     )
// }

export default WeatherApp