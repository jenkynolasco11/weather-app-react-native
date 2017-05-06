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
    flexDirection : 'row',
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
    fontSize : 24,
    //
  },
  alignItems : {
    alignItems : 'center',
    // flex : 1,
  }
})
