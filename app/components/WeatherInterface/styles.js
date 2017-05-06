import { 
  StyleSheet,
  Platform
} from 'react-native'

const isIOS = Platform.OS === 'ios'

export default StyleSheet.create({
  main : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    // backgroundColor : 'steelblue'
  },
  text : {
    // fontFamily : 'Quicksand',
    fontFamily : isIOS ? 'Quicksand' : 'Poiret One',
    backgroundColor : 'transparent'
  },
  title : {
    fontSize : 26,
    backgroundColor : 'transparent',
    //
  },
  titleIcon: {
    marginLeft : -6,
    marginTop : -3,
    marginRight : -13
  },
  titleView : {
    flexDirection : 'row',
    //
  },
  city : {
    fontSize : 16,
    backgroundColor : 'transparent',
    //
  },
  temp : {
    fontSize : 45,
    backgroundColor : 'transparent',
    //
  },
  icon : {
    fontSize : 24,
    backgroundColor : 'transparent',
    //
  },
  alignItems : {
    alignItems : 'center',
    // flex : 1,
  }
})
