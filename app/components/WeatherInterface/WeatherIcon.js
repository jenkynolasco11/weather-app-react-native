import React from 'react'
import {
    TouchableWithoutFeedback,
    Animated,
    View
} from 'react-native'

import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const WeatherIcon = props => {
    // TODO : check this out later

    return (
        <View style={[
            props.styles.titleView,
            props.styles.alignItems
        ]}>
            <MaterialCommIcons
                style={[ props.styles.icon ]}
                name={ props.icon }
                size={40}
                color="#FFC300"
            />
            {
                props.renderText([
                    props.styles.text,
                    props.styles.icon
                ], props.desc )
            }
        </View>
    )
}

export default WeatherIcon