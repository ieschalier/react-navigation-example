import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  PanResponder
} from 'react-native'

const Second = ({ position, index, navigation }) => {
  const animatedValue = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.3, 1, 1],
  })

  const animatedTranslate = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [Dimensions.get('window').height, 0, 0],
  })
  
  return (
    <View
      style={{ flex: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <View style={{ height: 200 }} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: '#897',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
        >
          <Animated.View
            style={{
              height: 100,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  scale: animatedValue,
                }
              ],
              backgroundColor: '#874',
            }}
          >
            <Text>Back</Text>
          </Animated.View>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Animated.Text
            style={{
              fontSize: 22,
              color: '#fff',
              transform: [
                {
                  translateY: animatedTranslate,
                }
              ]
            }}
          >
            Hello
            </Animated.Text>
        </View>
      </View>
    </View>
  )
}

export default Second
