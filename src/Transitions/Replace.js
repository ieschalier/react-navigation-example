import React from 'react'
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  Transitioner,
  addNavigationHelpers,
  StackRouter,
  createNavigationContainer,
  createNavigator,
} from 'react-navigation'
import SafeArea from 'react-native-safe-area-view'
import generateCustomNavigationView from './generateCustomNavigationView'

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

export default generateCustomNavigationView(
  () => ({ duration: 200, easing: Easing.out(Easing.quad) }),
  (componentProps, props, scene) => {
    const { navigation, router } = componentProps
    const { routes } = navigation.state
    const { position } = props
    const { index } = scene

    const animatedValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [Dimensions.get('window').width, 0, -Dimensions.get('window').width],
    })

    const animation = {
      transform: [
        {
          translateX: animatedValue,
        }
      ]
    }

    const Scene = router.getComponentForRouteName(scene.route.routeName)

    return (
      <Animated.View key={index} style={[styles.view, animation]}>
        <Scene
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index],
          })}
        />
      </Animated.View>
    )
  }
)
