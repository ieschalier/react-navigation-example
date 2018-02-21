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
import First from './First'
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

const config = () => ({ duration: 600, easing: Easing.out(Easing.ease) })

const render = (componentProps, props, scene) => {
  const { navigation, router } = componentProps
  const { routes } = navigation.state
  const { position } = props
  const { index } = scene

  const animatedValue = position.interpolate({
    inputRange: [index - 1, index - 0.7, index],
    outputRange: [0, 1, 1],
  })

  const animatedTranslate = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [(Dimensions.get('window').height / 2), 0, 0],
  })

  const animation = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedTranslate,
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
        position={position}
        index={index}
      />
    </Animated.View>
  )
}

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
    <View style={{ flex: 1 }}>
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
              transform:[
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

const routes = {
  First: { screen: First },
  Second: { screen: Second },
}

export default generateCustomNavigationView(config, render, routes)
