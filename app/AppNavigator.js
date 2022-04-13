import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './routes'


const navigationRef = React.createRef();

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login"
      >
        {routes.map(item => <Stack.Screen key={item.name} {...item} options={{headerShown: false}}/>)}
      </Stack.Navigator>
    </NavigationContainer>)
}

export default AppNavigator;
