import React from 'react'
import { TouchableOpacity, Text  } from 'react-native'
import SafeArea from 'react-native-safe-area-view'

export default ({ navigation }) => (
  <SafeArea style={{ flex: 1, backgroundColor: '#678' }}>
    <TouchableOpacity
      style={{ marginTop: 50 }}
      onPress={() => navigation.navigate('Second')}
    >
      <Text>Click Here</Text>
    </TouchableOpacity>
  </SafeArea>
)
