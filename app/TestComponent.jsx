import React, { Component } from 'react'
import {
    Animated,
    Easing
} from 'react-native'

const Test = props => {
    return (
    <View style={{
        flex : 1,
        justifyContent: "center",
        alignItems : "center"
    }}>
        <Text>
        {
            "some text"
        }
        </Text>
    </View>
    )
}