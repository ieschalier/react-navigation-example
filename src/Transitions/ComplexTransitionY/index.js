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
import CardStack from 'react-navigation/src/views/CardStack/CardStack'
import SafeArea from 'react-native-safe-area-view'
import First from '../First'
import Second from './Second'

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

class NavigationView extends React.Component {
  renderScene = (props, scene) => {
    const { navigation, router } = this.props
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

  renderScenes = (props, prevProps) => {
    const scenes = props.scenes.map(
      scene => this.renderScene(props, scene)
    )

    return (
      <View style={{ flex: 1 }}>
        {scenes}
      </View>
    )
  }

  render() {
    const { navigation, router } = this.props

    return (
      <Transitioner
        configureTransition={() => ({ duration: 600, easing: Easing.out(Easing.ease) })}
        navigation={navigation}
        render={this.renderScenes}
      />
    )
  }
}

const Router = StackRouter({
  First: { screen: First },
  Second: { screen: Second },
})

const CustomTransitioner = createNavigationContainer(
  createNavigator(Router)(NavigationView)
)

export default CustomTransitioner
