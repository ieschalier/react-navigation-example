import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  PanResponder
} from 'react-native'

class ModalGesture extends React.Component {
  position = new Animated.ValueXY(0, 0)

  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {

      },
      onPanResponderMove: (evt, { dx, dy }) => {
        this.position.setValue({ x: dx > 0 ? dx : 0, y: dy > 0 ? dy : 0 })
        // Animated.event([
        //   { dx: this.position.x, dy: this.position.y }
        // ])
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, { moveY }) => {
        if (moveY > Dimensions.get('window').height / 3) {
          Animated.spring(this.position, {
            toValue: {x: 0, y: Dimensions.get('window').height},
            useNativeDriver: true,
          }).start()
          this.props.navigation.goBack(null)
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start()
        }
      },
      onPanResponderTerminate: (evt, { moveY }) => {
        if (moveY > Dimensions.get('window').height / 3) {
          this.position.setValue({
            x: 0,
            y: Dimensions.get('window').height
          })
        } else {
          this.position.setValue({x: 0, y: 0}) 
        }
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  render() {
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={{
          flex: 1,
          top: 0,
          left: 0,
          transform: [
            {
              translateY: this.position.y
            },
          ]
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default ModalGesture
