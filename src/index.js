import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import SafeArea from 'react-native-safe-area-view'
import { StackNavigator } from 'react-navigation'
import * as transitions from './Transitions'

const List = ({ navigation }) => (
  <SafeArea style={{ flex: 1 }}>
    <FlatList
      data={Object.keys(transitions.default).map(key => ({
        key: key,
        route: key,
      }))}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#eee',
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 15, padding: 10 }}>
              {item.key}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: '#fff' }} />
      )}
    />
  </SafeArea>
)

const Navigator = StackNavigator(
  {
    Home: { screen: List },
    ...Object.keys(transitions.default).reduce((r, key) => ({
      ...r,
      [key]: { screen: transitions.default[key] },
    }), {}),
  },
  {
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: navigation.state.routeName,
      }
    },
  },
)

export default Navigator
