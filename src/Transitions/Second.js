import React from 'react'
import { TouchableOpacity, Text  } from 'react-native'
import SafeArea from 'react-native-safe-area-view'

export default ({ navigation }) => (
  <SafeArea style={{ flex: 1, backgroundColor: '#897' }}>
    <TouchableOpacity
      style={{ marginTop: 50 }}
      onPress={() => navigation.goBack(null)}
    >
      <Text>Back</Text>
    </TouchableOpacity>
  </SafeArea>
)
