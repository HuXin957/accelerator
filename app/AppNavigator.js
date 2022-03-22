import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import y from './utils/style';
import routes from './routes'


const navigationRef = React.createRef();

const Stack = createStackNavigator();

function AppNavigator() {
  return (<NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="Home"
    >
      {routes.map(item => <Stack.Screen key={item.name} {...item} options={{headerShown: false}}/>)}
    </Stack.Navigator>
  </NavigationContainer>)
}

export default AppNavigator;
