import React from 'react'

import {
    TouchableWithoutFeedback,
    Animated
} from 'react-native'

const TouchableButton = props => {
    const opacity = props.textOpacity

    return (
        <TouchableWithoutFeedback onPress={ props.switchTemp }>
            <Animated.View style={{ opacity }}>
            {
                props.renderText([
                    props.styles.text,
                    props.styles.temp
                ], `${ props.temp } °${ props.tempUnit }`)
            }
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default TouchableButton