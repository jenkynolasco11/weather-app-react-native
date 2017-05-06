import React from 'react'

import WeatherInterface from './components/WeatherInterface'
// import WeatherInterface from './TestComponent.jsx'

import config from './config'

const App = () => <WeatherInterface KEY={ config.KEY } />
// const App = WeatherInterface

export default App