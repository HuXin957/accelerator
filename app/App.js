import React from 'react';
import AppNavigator from './AppNavigator';
import Portal from "@huxin957/react-native-portal";

const App = () => {
  return (
    <Portal.Host>
      <AppNavigator/>
    </Portal.Host>
  );
};


export default App;
