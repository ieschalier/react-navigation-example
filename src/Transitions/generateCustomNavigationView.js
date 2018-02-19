import React from 'react'
import {
  View,
  Text,
  Easing,
  Animated,
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
import Second from './Second'

const defaultConfig = (props, prevProps) => ({
  duration: 200,
  easing: Easing.out(Easing.ease),
})

const defaultRoutes = {
  First: { screen: First },
  Second: { screen: Second },
}

const generateCustomNavigationView = (
  config = defaultConfig,
  renderScene,
  routes = defaultRoutes,
) => {
  class NavigationView extends React.Component {
    renderScenes = (props, prevProps) => {
      const scenes = props.scenes.map(
        scene => renderScene(this.props, props, scene)
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
          configureTransition={config}
          navigation={navigation}
          render={this.renderScenes}
        />
      )
    }
  }

  const Router = StackRouter(routes)

  const CustomTransitioner = createNavigationContainer(
    createNavigator(Router)(NavigationView)
  )

  return CustomTransitioner
}

export default generateCustomNavigationView
