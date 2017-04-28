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
  //   fontSize : 30,
    fontFamily : 'Quicksand',
    // fontFamily : isIOS ? 'Iowan Old Style' : 'Poiret One',
  //   // fontWeight : 'bold',
    // fontStyle : 'italic',
    // color : '#eee',
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