import React from 'react'
import {
    View,
    Animated
} from 'react-native'

import IoniconsIcons from 'react-native-vector-icons/Ionicons'

const AnimatedIcon = Animated.createAnimatedComponent(IoniconsIcons)

// TODO: Refactor later to a stateless component
const MainTitle = props => {
    // const renderText = (style, text) => <Text style={style}>{text}</Text>
    const rotate = props.spin

    return (
        <View style={[props.styles.titleView]}>
            {
                props.renderText([
                    props.styles.text, props.styles.title
                ], 'The weather in your z')
            }
            <AnimatedIcon
                style={[
                    props.styles.titleIcon, {
                        transform: [{ rotate }],
                    //
                    }
                ]}
                name={'ios-sunny-outline'}
                size={48}
                color={'#FF9700'}
            />
            {
                props.renderText([
                    props.styles.text, props.styles.title
                ], 'ne')
            }
        </View>
    )
}

export default MainTitle